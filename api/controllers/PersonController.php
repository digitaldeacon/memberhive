<?php
namespace app\controllers;

use app\models\Family;
use app\models\Person;
use app\models\PersonFamily;
use app\models\PersonTag;
use app\models\Tag;
use app\models\User;
use app\enums\UserRole;

use yii\helpers\ArrayHelper;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;
use yii\web\UnprocessableEntityHttpException;

class PersonController extends MHController
{
    private $_getActions = ['list', 'search'];
    private $_postActions = [
        'update',
        'delete',
        'create',
        'upload-avatar'
    ];

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['verbs'] = [
            'class' => \yii\filters\VerbFilter::class,
            'actions' => ArrayHelper::merge($this->_getActions, $this->_postActions)
        ];
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::class,
            'rules' => [
                [
                    'actions' => ArrayHelper::merge($this->_getActions, $this->_postActions),
                    'allow' => true,
                    'roles' => ['@'],
                ],
            ],
        ];
        return $behaviors;
    }

    /**
     * @inheritdoc
     */
    public function beforeAction($action)
    {
        if (in_array($action->id, $this->_postActions)) {
            $this->enableCsrfValidation = false;
        }

        return parent::beforeAction($action);
    }

    // returns Person
    public function actionUploadAvatar()
    {
        $ret = [];
        $post = \Yii::$app->request->post();
        $split = explode(',', $post['image']);
        $data = null;

        if (!isset($post['image'])) {
            throw new BadRequestHttpException('No image data received');
        }
        if (!isset($post['personId']) || empty($post['personId'])) {
            throw new BadRequestHttpException('No person id received');
        }

        $person = Person::findOne(['uid'=>$post['personId']]);

        if (empty($person)) {
            throw new UnprocessableEntityHttpException('No person could be selected');
        }

        // this freaky conversion is because we cannot (yet) pass the file type in avatar-edit.dialog.ts
        // additional downside: the image cropper wants to convert everything to .png!
        // TODO: this needs revision!
        $ftype = explode(';', $split[0]);
        $type = explode('/', $ftype[0])[1];

        $type = ($type=='jpeg') ? 'jpg' : $type;
        $data = base64_decode($split[1]);

        // set the proper path to save so that Angular can read the image
        // should be ./assets/images/avatar, so that images get uploaded correctly on dev and prod?
        $dir = file_exists(__DIR__ . '/../config/debug.php') ? 'apps/web/src/' : '';

        $imagePath =  \Yii::getAlias('@webroot') . '/../'.$dir.'assets/images/avatar/person/';
        $image = $post['personId'] . '.' . $type;

        if (file_put_contents($imagePath . $image, $data)) {
            // don't store the actual url here, the app should define where the files are located
            // this will make moving of files easier
            $person->avatarUrlSmall = $image;
            if (!$person->save()) {
                throw new UnprocessableEntityHttpException($person->errors);
            }
            $ret[] = $person;
        }

        return $person->toResponseArray();
    }

    public function actionList()
    {
        $ret = [];
        $people = Person::find()
            ->with('user', 'statusTags')
            ->orderBy(['lastName' => SORT_ASC])
            ->all();

        foreach ($people as $person) {
            $ret[] = $person->toResponseArray();
        }
        return $ret;
    }

    public function actionSearch()
    {
        $ret = [];
        // TODO: include relevant joins here. Don't allow lazy loading (too many calls)
        foreach (Person::find()->each() as $person) {
            $ret[] = $person->toResponseArray();
        }
        return ['response' => $ret];
    }

    public function actionGet($id)
    {
        $person = $this->findModelByUID($id);
        return ['response' => $person->toResponseArray()];
    }

    public function actionUpdate($id)
    {
        $person = $this->findModelByUID($id);
        $person->scenario = PERSON::SCENARIO_EDIT;
        $post = \Yii::$app->request->post();
        if ($person && $post) {
            $person = $this->setPerson($person, $post);
            $user = $this->setUser($person, $post);
            // TODO: check if surname, name, address already exist, avoid duplication by erroneous calls
            if (!$person->save()) {
                throw new UnprocessableEntityHttpException(json_encode($person->errors));
            }
            $this->saveTags($person, $post);
            if (isset($user)) {
                $person->user = $user;
                $password = isset($post['user']['password'])
                    ? trim($post['user']['password'])
                    : '';
                $dontSendCreds = isset($post['user']['noCredentials']) && !empty($post['user']['noCredentials']);
                if (!$dontSendCreds && !empty($password)) {
                    $this->sendCredentials($person, $password);
                }
            }
            return $person->toResponseArray();
        } else {
            throw new ServerErrorHttpException(json_encode($person->errors));
        }
    }

    public function actionCreate()
    {
        $post = \Yii::$app->request->post();
        $person = new Person(['scenario' => PERSON::SCENARIO_NEW]);
        $person = $this->setPerson($person, $post);
        $user = $this->setUser($person, $post);

        $familyArray = [];

        if ($person->save()) {
            $this->saveTags($person, $post);
            if (isset($user)) {
                $person->user = $user;
                if (!isset($post['user']['noCredentials'])
                    || empty($post['user']['noCredentials'])
                ) {
                    $this->sendCredentials($person, trim($post['user']['password']));
                }
            }
            if (isset($post['familyId']) && !empty($post['familyId'])) {
                $family = Family::findOne($post['familyId']);
                if ($family) {
                    $family->link('members', $person);
                    $pfam = PersonFamily::find()->where([
                        'family_id' => $family->id,
                        'person_id' => $person->id
                    ])->one();
                    $pfam->role = $post['familyRole'];
                    $pfam->ref = $person->uid;
                    $pfam->save();
                    unset($family->personFamilies);
                }
                $familyArray = Family::findOne($post['familyId'])->toResponseArray();
            }
            return [
                'person' => $person->toResponseArray(),
                'family' => $familyArray
            ];
        } else {
            throw new UnprocessableEntityHttpException(json_encode($person->errors));
        }
    }

    public function actionDelete($id)
    {
        $person = $this->findModelByUID($id);
        $t = Person::getDb()->beginTransaction();
        try {
            PersonFamily::deleteAll(['person_id'=>$person->id]);
            PersonTag::deleteAll(['person_id'=>$person->id]);
            $person->delete();
            $t->commit();
        } catch (\Throwable $e) {
            $t->rollBack();
            throw new UnprocessableEntityHttpException('Could not delete '
                . $person->fullName . ': ' . $e->getMessage());
        }
        $ret = ['id'=>$person->id, 'fullName'=>$person->fullName];

        return $ret;
    }

    protected function saveTags($person, $post)
    {
        $ptags_prv = PersonTag::find(['person_id'=>$person->id]);
        if (!empty($ptags_prv)) {
            $person->unlinkAll('tags', true);
        }
        if (!empty($post['status'])) {
            foreach ($post['status'] as $tag) {
                $tagCheck = Tag::findOne(['text' => trim($tag['text'])]);
                if (empty($tagCheck)) {
                    $newTag = new Tag();
                    $newTag->text = trim($tag['text']);
                    $newTag->context = 'person';
                    $newTag->type = 'status';
                    if ($newTag->save()) {
                        $newTag->link('person', $person);
                    } else {
                        throw new UnprocessableEntityHttpException('Tag: ' . json_encode($newTag->errors));
                    }
                } else {
                    $tagCheck->link('person', $person);
                }
            }
        }
    }

    protected function setPerson($person, $post): Person
    {
        $person->firstName = $post['firstName'];
        $person->middleName = $this->valOrNull($post['middleName']);
        $person->lastName = $post['lastName'];
        $person->email = $this->valOrNull($post['email']);
        $person->gender = $post['gender'];
        $person->maritalStatus = $post['maritalStatus'];
        $person->address = json_encode($post['address']);
        $person->phoneHome = $this->valOrNull($post['phoneHome']);
        $person->phoneWork = $this->valOrNull($post['phoneWork']);
        $person->phoneMobile = $this->valOrNull($post['phoneMobile']);
        $person->birthday = !empty($post['birthday'])
            ? date('Y-m-d', strtotime($post['birthday']))
            : null;
        $person->baptized = !empty($post['baptized'])
            ? date('Y-m-d', strtotime($post['baptized']))
            : null;
        $person->anniversary = !empty($post['anniversary'])
            ? date('Y-m-d', strtotime($post['anniversary']))
            : null;
        return $person;
    }

    protected function setUser($person, $post)
    {
        $user = null;
        $role = isset($post['user']['role']) && !empty($post['user']['role'])
            ? trim($post['user']['role'])
            : UserRole::MEMBER;
        if (empty($person->user) && !empty($post['user']['password'])) {
            $user = new User();
            $user->personId = $person->id;
            $user->username = trim($post['user']['username']);
            $user->setPassword(trim($post['user']['password']));
            $user->role = $role;
            if (!$user->save()) {
                throw new UnprocessableEntityHttpException(json_encode($user->errors));
            }
            $user->setRole($role);
        } elseif (!empty($person->user)) {
            $user = $person->user;
            $user->role = $role;
            $user->username = trim($post['user']['username']);
            if (!empty($post['user']['password'])) {
                $user->setPassword(trim($post['user']['password']));
            }
            $user->setRole($role);
            if (!$user->save()) {
                throw new UnprocessableEntityHttpException(json_encode($user->errors));
            }
        }
        return $user;
    }

    protected function findModel($id): Person
    {
        $person = Person::find()->with('tags')->where(['uid'=>$id])->one();
        if ($person === null) {
            throw new NotFoundHttpException('The requested person does not exist.');
        }
        return $person;
    }
    protected function findModelByUID($id): Person
    {
        $person = Person::find()->with('tags')->where(['uid'=>$id])->one();
        if ($person === null) {
            throw new NotFoundHttpException('The requested person does not exist.');
        }
        return $person;
    }

    private function valOrNull($value) {
        return !empty($value) ? $value : null;
    }

    // TODO: make this into an authenticate process
    private function sendCredentials($person, $pw)
    {
        \Yii::$app->mailer
            ->compose(
                'newpw',
                [
                    'name' => $person->firstName,
                    'username' => $person->user->username,
                    'password' => $pw
                ]
            )
            ->setFrom('mailbee@memberhive.com')
            ->setTo('thomas.hochstetter@me.com') //$person->email
            ->setSubject('MH - New Credentials')
            ->send();
    }
}
