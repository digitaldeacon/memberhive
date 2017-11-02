<?php
namespace app\controllers;

use app\models\Family;
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
                        'list'],
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

    public function actionList($id = 0)
    {
        $ret = [];
        $families = Family::find()
            ->orderBy(['name' => SORT_ASC])
            ->all();

        foreach ($families as $family) {
            $ret[] = $family->toResponseArray();
        }
        return $ret;
    }

    /**
     * @param $id
     * @return Tag
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
