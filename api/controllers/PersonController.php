<?php
namespace app\controllers;
use app\models\Person;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;

class PersonController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['list', 'get', 'update', 'create','search'],
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

    public function actionSearch()
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
        $person = $this->findModelByUID($id);
        return ['response' => $person->toResponseArray()];
    }
    public function actionUpdate($id)
    {
        $person = $this->findModel($id);
        if ($person->load(\Yii::$app->request->post()) && $person->save()) {
            return ['response' => $person->toResponseArray()];
        } else {
            throw new BadRequestHttpException($person->errors);
        }
    }
    public function actionCreate()
    {
        $person = new Person();
        if ($person->load(\Yii::$app->request->post()) && $person->save()) {
            return ['response' => $person->toResponseArray()];
        } else {
            throw new BadRequestHttpException($person->errors);
        }
    }

    protected function findModel($id)
    {
        $user = Person::findOne($id);
        if ($user === null)
            throw new NotFoundHttpException('The requested person does not exist.');
        return $user;
    }

    protected function findModelByUID($id)
    {
        $user = Person::findOne(['uid'=>$id]);
        if ($user === null)
            throw new NotFoundHttpException('The requested person does not exist.');
        return $user;
    }
}