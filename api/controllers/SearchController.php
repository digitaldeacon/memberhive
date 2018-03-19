<?php
namespace app\controllers;

use app\models\Person;

class SearchController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::class,
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

        foreach (Person::find()->where($query)->each() as $person) {
            /**
 * $person Person
*/
            $ret[] = [
                'id' => $person->id,
                'uid' => $person->uid,
                'text' => $person->fullName,
                'icon' => $person->avatar,
                'type' => 'person',
                'url' => ['/person/view', $person->uid]
            ];
        }
        return ['response' => $ret];
    }
}
