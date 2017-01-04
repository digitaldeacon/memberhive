<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;

class SiteController extends Controller
{
    public function behaviors()
    {
        return [
            'access' => [
                'class' => \yii\filters\AccessControl::className(),
                'rules' => [
                    [
                        'actions' => ['login', 'error', 'log-js'],
                        'allow' => true,
                        'roles' => ['?', '@'],
                    ],

                    [
                        'actions' => ['logout', 'index', ],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
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

}
