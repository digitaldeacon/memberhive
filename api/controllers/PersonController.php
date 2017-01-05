<?php
namespace app\controllers;

class PersonController extends MHController
{
    public $modelClass = 'app\models\Person';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['test'],
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
}