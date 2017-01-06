<?php
namespace app\controllers;
class PersonController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['test', 'index'],
                    'allow' => true,
                    'roles' => ['@'],
                ],
            ],
        ];
        return $behaviors;
    }

    public function actionTest()
    {
        return ["response" => "test"];
    }
    public function actionIndex()
    {
        return ["response" => "test"];
    }
}