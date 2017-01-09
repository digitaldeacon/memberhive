<?php
namespace app\controllers;
use app\models\Person;
use yii\web\ServerErrorHttpException;

class PersonController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['list', 'get', 'update', 'create'],
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

    public function actionGet($id)
    {
        $person = Person::findOne($id);
        return ['response' => $person->toResponseArray()];
    }
    public function actionUpdate($id)
    {
        $person = Person::findOne($id);
        if ($person->load(\Yii::$app->request->post()) && $person->save()) {
            return ['response' => $person->toResponseArray()];
        } else {
            throw new ServerErrorHttpException($person->errors);
        }
    }
    public function actionCreate()
    {
        $person = new Person();
        if ($person->load(\Yii::$app->request->post()) && $person->save()) {
            return ['response' => $person->toResponseArray()];
        } else {
            throw new ServerErrorHttpException($person->errors);
        }
    }
}