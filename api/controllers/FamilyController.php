<?php
namespace app\controllers;

use app\models\Family;
use app\models\Person;
use app\models\PersonFamily;
use yii\web\BadRequestHttpException;

class FamilyController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => [
                        'list',
                        'new',
                        'update',
                        'accept',
                        'remove',
                        'ignore',
                        'set-role',
                        'link'
                    ],
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
        $allowedActions = [
            'new', 'update', 'accept',
            'remove', 'ignore', 'set-role',
            'link'
        ];

        if (in_array($action->id, $allowedActions)) {
            $this->enableCsrfValidation = false;
        }
        return parent::beforeAction($action);
    }

    /**
     * @inheritdoc
     */
    public function actionDelete() // on post
    {
        $post = \Yii::$app->request->post();
        throw new BadRequestHttpException('Insufficient parameters: ' . json_encode($post));
    }

    public function actionNew()
    {
        $post = \Yii::$app->request->post();
        if ($post) {
            if (!empty($post['name']) && empty($post['id'])) {
                $fam = new Family();
                $fam->name = $post['name'];
                if (!$fam->save()) {
                    throw new BadRequestHttpException(json_encode($fam->getFirstError()));
                }
            }
            if (!empty($post['id'])) {
                $fam = Family::findOne($post['id']);
            }
            if (isset($post['members'])) {
                foreach ($post['members'] as $uid) {
                    $person = Person::find()->where(['uid'=>$uid])->one();
                    if ($person) {
                        try {
                            $fam->link('members', $person);
                        } catch (\yii\base\InvalidCallException $e) {
                            throw new BadRequestHttpException(json_encode($fam->getFirstError()));
                        }
                    }
                }
            }
            return $fam->toResponseArray();
        }
        throw new BadRequestHttpException('Wrong or missing parameters');
    }

    public function actionUpdate($id = 0) {

        $post = \Yii::$app->request->post();

        if (YII_DEBUG) {
            $dbg =  $id . ' ** ' . json_encode($post);
        }

        if (empty($post)) {
            throw new BadRequestHttpException('Empty POST' . ': [' . $dbg . ']');
        }

    }

    public function actionRemove($id = 0) {
        $post = \Yii::$app->request->post();
        $person = Person::find()
            ->where(['uid'=>$id])
            ->one();

        if (YII_DEBUG) {
            $dbg =  $id . ' ** ' . json_encode($post) . ' ** ' . json_encode($person);
        }
        if (!$person || empty($post) || !isset($post['family'])) {
            throw new BadRequestHttpException('No person or empty POST' . ': [' . $dbg . ']');
        }

        PersonFamily::deleteAll([
            'family_id' => $post['family']['id'],
            'person_id' => $person->id
        ]);

        return Family::findOne($post['family']['id'])->toResponseArray();
    }

    public function actionIgnore($id = 0) {
        $post = \Yii::$app->request->post();
        $unrelated = [];

        if (YII_DEBUG) {
            $dbg =  $id . ' ** ' . json_encode($post);
        }
        if (empty($post) || !isset($post['family'])) {
            throw new BadRequestHttpException('No family or empty POST' . ': [' . $dbg . ']');
        }

        // ignore suggested member and save to family, so no suggestions appear again
        $family = Family::findOne($post['family']['id']);
        $unrelated = !empty($family->unrelated) ? json_decode($family->unrelated) : [];
        array_push($unrelated, $post['member']);
        $family->unrelated = json_encode($unrelated);
        if (!$family->save()) {
            throw new BadRequestHttpException(json_encode($family->getFirstErrors()));
        }
        return $family->toResponseArray();
    }

    public function actionAccept($id = 0) {
        $post = \Yii::$app->request->post();
        $person = Person::find()
            ->where(['uid'=>$id])
            ->one();

        if (YII_DEBUG) {
            $dbg =  $id . ' ** ' . json_encode($post) . ' ** ' . json_encode($person);
        }
        if (!$person || empty($post) || !isset($post['family'])) {
            throw new BadRequestHttpException('No person or empty POST' . ': [' . $dbg . ']');
        }

        $family = Family::findOne($post['family']['id']);

        // accept suggested member to family
        if (!empty($family)) {
            $family->link('members', $person);
        }
        return Family::findOne($post['family']['id'])->toResponseArray();
    }

    public function actionLink($id = 0) {
        $post = \Yii::$app->request->post();
        $person = Person::find()
            ->where(['uid'=>$id])
            ->one();

        if (YII_DEBUG) {
            $dbg =  $id . ' ** ' . json_encode($post) . ' ** ' . json_encode($person);
        }
        if (!$person || empty($post) || !isset($post['family'])) {
            throw new BadRequestHttpException('No person or empty POST' . ': [' . $dbg . ']');
        }

        $family = Family::findOne($post['family']['id']);

        // accept suggested member to family
        if (!empty($family)) {
            $family->link('members', $person);
        }
        if (isset($post['role']) && !empty($post['role'])) {
            $pfam = PersonFamily::find()->where(['family_id'=>$family->id])->one();
            $pfam->role = $post['role'];
            if (!$pfam->save()) {
                throw new BadRequestHttpException(json_encode($pfam->errors));
            }
        }
        return Family::findOne($post['family']['id'])->toResponseArray();
    }

    public function actionSetRole($id = 0) {
        $post = \Yii::$app->request->post();
        $person = Person::findOne(['uid' => $id]);

        if (YII_DEBUG) {
            $dbg =  $id . ' ** ' . json_encode($post);
        }

        if (empty($post) || !isset($post['family'])) {
            throw new BadRequestHttpException('Empty POST' . ': [' . $dbg . ']');
        }

        // Change role if Family object contains a role string
        if (isset($post['role']) && !empty($post['role'])) {
            $pfam = PersonFamily::find()
                ->where([
                'family_id' => $post['family']['id'],
                'person_id' => $person->id
                ])
                ->one();
            $pfam->role = $post['role'];
            if (!$pfam->save()) {
                throw new BadRequestHttpException(json_encode($pfam->errors));
            }
        }
        return Family::findOne($post['family']['id'])->toResponseArray();
    }

    public function actionList($id = 0)
    {
        $ret = [];
        $families = Family::find()
            ->with('members')
            ->orderBy(['name' => SORT_ASC])
            ->all();

        foreach ($families as $family) {
            $ret[] = $family->toResponseArray();
        }
        return $ret;
    }

    /**
     * @param $id
     * @return Family
     */
    protected function findModel($id)
    {
        $family = Family::findOne($id);
        if ($family === null) {
            throw new NotFoundHttpException('The requested family does not exist.');
        }
        return $family;
    }
}
