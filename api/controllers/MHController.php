<?php
namespace app\controllers;

use yii\filters\Cors;
use yii\web\Controller;
use yii\filters\ContentNegotiator;
use yii\web\Response;
use app\helpers\MhAuth;

class MHController extends Controller
{
    public function behaviors()
    {
        return [
            'contentNegotiator' => [
                'class' => ContentNegotiator::className(),
                'formats' => [
                    'application/json' => Response::FORMAT_JSON,
                ],
            ],
            'cors' => [
                'class' => Cors::className(),
                'cors' => [
                    'Origin' => ['http://localhost:4200'],
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Allow-Credentials' => true,
                ],
            ],
            'authenticator' => [
                'class' => MhAuth::className()
            ],
        ];
    }
}
