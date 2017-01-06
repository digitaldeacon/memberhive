<?php
namespace app\controllers;
use app\models\Person;

class PersonController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['test', 'index', 'list'],
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

    public function actionList()
    {
        $ret = [];
        foreach(Person::find()->each() as $person) {
            /** $person Person */
            $ret[] = $person->toResponseArray();
        }
        return ['response' => $ret];
    }
}