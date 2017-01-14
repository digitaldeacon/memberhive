<?php
namespace app\controllers;

use app\models\Person;

class SearchController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['search'],
                    'allow' => true,
                    'roles' => ['@'],
                ],
            ],
        ];
        return $behaviors;
    }

    public function actionSearch($q)
    {
        $ret = [];
        $query = ['or',
            ['like','firstName',$q],
            ['like','lastName',$q],
            ['like','nickName',$q],
            ['like','address',$q]
        ];

        foreach(Person::find()->where($query)->each() as $person) {
            /** $person Person */
            $ret[] = $person->toResponseArray();
        }
        return ['response' => $ret];
    }
}