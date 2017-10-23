<?php
$params = include __DIR__ . '/params.php';

$client = getClient();

$config = [
    'id' => 'memberhive',
    'name' => 'MemberHive',
    'language' => 'de',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'components' => [
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'enableStrictParsing' => false,
            'rules' => [
            ],
        ],
        'request' => [
            'class' => '\yii\web\Request',
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ],
            'enableCookieValidation' => false,
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => false, // Don't forget to set Auto login to false
        ],
        'mailer' => include __DIR__ . '/mail_local.php',
        'log' => [
            'traceLevel' => 3,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],

            ],
        ],
        'db' => include __DIR__ . '/db_local.php',
    ],
    'params' => $params,
];


if (YII_DEBUG === true) {
    $debug = include __DIR__ . '/debug.php';
    $config = \yii\helpers\ArrayHelper::merge($config, $debug);
    $config['components']['log']['targets'][] = [
        'class' => 'yii\log\FileTarget',
        'levels' => ['info']
    ];
}
return $config;
