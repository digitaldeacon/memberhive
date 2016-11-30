<?php
namespace app\controllers;

class PersonController extends \yii\rest\ActiveController
{
    public $modelClass = 'app\models\Person';

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['authenticator'] = [
            'class' => \yii\filters\auth\HttpBearerAuth::className(),
        ];

        return $behaviors;
    }
}