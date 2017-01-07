<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;

class SiteController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['index', 'error', 'log-js'],
                    'allow' => true,
                    'roles' => ['?'],
                ],
                [
                    'actions' => ['test-login'],
                    'allow' => true,
                    'roles' => ['@'],
                ],
            ],
        ];
        return $behaviors;
    }

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],

        ];
    }

    public function actionIndex()
    {
        echo "Memberhive";
    }



    public function actionError()
    {
        $exception = Yii::$app->errorHandler->exception;
        print_r(Yii::$app->errorHandler->displayVars);
        if ($exception !== null) {
            return $this->render('error', ['exception' => $exception]);
        }
    }

    public function actionTestLogin()
    {
        return ["ok"];
    }

}
