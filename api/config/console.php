<?php
if (!defined('API_BASE')) {
    define('API_BASE', dirname(__DIR__));
}
if (!defined('APP_MODE')) {
    define('APP_MODE', 'console');
}

function init()
{
    $params = include __DIR__ . '/params.php';
    $db = include __DIR__ . '/db_local.php';
    $config = [
        'id' => 'mh-console',
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
}

return init();