<?php
namespace app\controllers;

use app\models\Family;
use app\models\Person;
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
                        'new'
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
            'new'
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
                        } catch(\yii\base\InvalidCallException $e) {
                            throw new BadRequestHttpException(json_encode($fam->getFirstError()));
                        }
                    }
                }
            }
            return $fam->toResponseArray();
        }
        throw new BadRequestHttpException('Wrong or missing parameters');
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
