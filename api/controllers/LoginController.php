<?php
namespace app\controllers;

use app\models\User;
use yii\filters\Cors;
use yii\filters\ContentNegotiator;
use yii\web\Response;

class LoginController extends \yii\web\Controller
{
    public $enableCsrfValidation = false;

    public function behaviors()
    {
        $behaviors['contentNegotiator'] = [
            'class' => ContentNegotiator::className(),
            'formats' => [
                'application/json' => Response::FORMAT_JSON,
            ]
        ];
        $behaviors['cors'] = [
            'class' => Cors::className(),
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => true,
            ],
        ];
        return $behaviors;
    }

    public function actionLogin()
    {
        $request = \Yii::$app->request;
        if (empty($request->post()) || empty($request->post('username')) || empty($request->post('password'))) {
            return [json_encode($_REQUEST)];
            // throw new \yii\web\BadRequestHttpException('Request error. Post is empty or has missing parameters');
        }
        $model = User::findOne(['username' => $request->post('username')]);
        if (empty($model)) {
            throw new \yii\web\NotFoundHttpException('User not found');
        }
        if ($model->validatePassword($request->post('password'))) {
            $model->save(false);
            return ['user' => $model->toResponseArray()];
        } else {
            throw new \yii\web\ForbiddenHttpException('Wrong login details');
        }
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();
        return;
    }

    public function actionAlive()
    {
        return [true];
    }
}
