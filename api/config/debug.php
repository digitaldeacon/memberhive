<?php
$config['modules']['debug'] = [
    'class' => 'yii\debug\Module',
    'allowedIPs' => ['127.0.0.1'], // accessible to this ip address only
];
$config['bootstrap'][] = 'debug';
return  $config;
