<?php
$params = require(__DIR__ . '/params.php');

$config = [
    'id' => 'bko3',
    'name' => "Bibelkunde Admin",
    'language' => 'de',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'components' => [
        'assetManager' => [
        ],
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'OjciaUHovs9udClZwsmkWaAhOcjisjo72nUJbBU0',
        ],
        'cache' => [
            'class' => 'yii\caching\ApcCache',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'enableStrictParsing' => false,
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
            'authTimeout' => 60*60*24*30,//30 tage
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',

        ],
        'mailer' => require(__DIR__ . '/mail_local.php'),

        'log' => [
            'traceLevel' => 3,
            'targets' => [
                [
                    'class' => 'yii\log\SyslogTarget',
                    'levels' => ['error', 'warning'],
                ],

            ],
        ],
        'db'    => require(__DIR__ . '/db_local.php'),
      
        'i18n'  => [
            'translations' => [
                '*' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'fileMap' => [
                        'app' => 'app.php',
                        'app/error' => 'error.php',
                    ],
                ],
            ],
        ],

    ],
    'modules' => [
        'gridview' =>  [
            'class' => '\kartik\grid\Module'
        ]
    ],
    'params' => $params,
];

    
if(YII_DEBUG === true) {
    $debug = require(__DIR__ . '/debug.php');
    $config = \yii\helpers\ArrayHelper::merge($config, $debug);
    $config['components']['log']['targets'][] = [
        'class' => 'yii\log\FileTarget',
        'levels' => ['info']
    ];

}
return $config;
