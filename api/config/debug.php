<?php
$config['modules']['debug'] = [
    'class' => 'yii\debug\Module',
    // 'traceLine' => '<a href="phpstorm://open?url={file}&line={line}">{file}:{line}</a>',
    // 'allowedIPs' => ['127.0.0.1:4200'], // accessible to this ip address only
];
$config['bootstrap'][] = 'debug';
return  $config;
