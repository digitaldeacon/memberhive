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
                    'actions' => ['list', 'view'],
                    'allow' => true,
                    'roles' => ['@'],
                ],
            ],
        ];
        return $behaviors;
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

    public function actionView($id)
    {
        $person = Person::findOne($id);
        return ['response' => $person->toResponseArray()];
    }
}