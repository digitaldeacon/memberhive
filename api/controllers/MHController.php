<?php
namespace app\controllers;

use yii\filters\Cors;
use yii\web\Controller;
use yii\filters\ContentNegotiator;
use yii\web\Response;
use app\helpers\MhAuth;
use yii\filters\auth\HttpBearerAuth;

class MHController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => MhAuth::class,
        ];
        $behaviors['contentNegotiator'] = [
            'class' => ContentNegotiator::class,
            'formats' => [
                'application/json' => Response::FORMAT_JSON,
            ]
        ];
        $behaviors['cors'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => true,
            ],
        ];
        $behaviors['authenticator']['except'] = [
            'options', 'login',
            'password-reset-request',
            'password-reset-token-verification',
            'password-reset'];
        return $behaviors;
    }

    public function actionOptions($id = null)
    {
        return 'ok';
    }
}
