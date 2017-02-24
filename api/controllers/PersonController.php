<?php
namespace app\controllers;
use app\models\Person;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;

class PersonController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['list','get','update','create','search','avatar-upload'],
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
        if ($action->id == 'update' ||
            $action->id == 'avatar-upload') {
            $this->enableCsrfValidation = false;
        }

        return parent::beforeAction($action);
    }

    // returns Person
    public function actionAvatarUpload()
    {
        $ret = [];
        $post = \Yii::$app->request->post();
        $split = explode(',',$post['base']);
        $data = null;

        if(!isset($post['base']))
            throw new BadRequestHttpException('No image data received');
        if(!isset($post['id']) || empty($post['id']))
            throw new BadRequestHttpException('No person id received');

        $person = Person::findOne(['uid'=>$post['id']]);
        $type = explode('/',$post['type'])[1];
        $data = base64_decode($split[1]);

        // set the proper path to save so that Angular can read the image
        $imagePath = \Yii::getAlias('@webroot').'/../files/';
        $image = $post['id'].'.'.$type;

        if(file_put_contents($imagePath.$image,$data))
        {
            // don't store the actual url here, the app should define where the files are located
            // this will make moving of files easier
            $person->avatarUrlSmall = $image;
            if(!$person->save())
                throw new BadRequestHttpException($person->errors);
            $ret[] = $person;
        }

        return ['response' => $ret];
    }

    public function actionList()
    {
        $ret = [];
        foreach(Person::find()->each() as $person) {
            /** $person Person */
            $ret[] = $person->toResponseArray();
        }
        return ['response' => $ret];
    }

    public function actionSearch()
    {
        $ret = [];
        foreach(Person::find()->each() as $person) {
            /** $person Person */
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
        $post = \Yii::$app->request->post();
        if ($person && $post) {
            $person->firstName = $post['firstName'];
            $person->middleName = $post['middleName'];
            $person->lastName = $post['lastName'];
            $person->gender = $post['gender'];
            $person->maritalStatus = $post['maritalStatus'];
            if(!$person->save()) {
                return ['response' => json_encode($person->errors)];
            }
            return ['response' => $person->toResponseArray()];
        } else {
            throw new BadRequestHttpException($person->errors);
        }
    }
    public function actionCreate()
    {
        $person = new Person();
        if ($person->load(\Yii::$app->request->post()) && $person->save()) {
            return ['response' => $person->toResponseArray()];
        } else {
            throw new BadRequestHttpException($person->errors);
        }
    }

    protected function findModel($id)
    {
        $user = Person::findOne($id);
        if ($user === null)
            throw new NotFoundHttpException('The requested person does not exist.');
        return $user;
    }

    protected function findModelByUID($id)
    {
        $user = Person::findOne(['uid'=>$id]);
        if ($user === null)
            throw new NotFoundHttpException('The requested person does not exist.');
        return $user;
    }
}