<?php

Yii::setAlias('@tests', dirname(__DIR__) . '/tests/codeception');

$params = require(__DIR__ . '/params.php');
$db = require(__DIR__ . '/db_local.php');

$config = [
    'id' => 'basic-console',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'controllerNamespace' => 'app\commands',
    'components' => [
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'authManager' => [
            'class' => 'yii\rbac\DbManager',
        ],
        'log' => [
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
    ],
    'controllerMap' => [
        'build-rest-doc' => [
            'sourceDirs' => [
                '@app\controllers',   // <-- path to your API controllers
            ],
            'template' => '//restdoc/restdoc.twig',
            'class' => '\pahanini\restdoc\controllers\BuildController',
            'sortProperty' => 'shortDescription', // <-- default value (how controllers will be sorted)
            'targetFile' => './api-doc.html'
        ],
    ],

    'params' => $params,
];

if (YII_DEBUG === true) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
    ];
}

return $config;
