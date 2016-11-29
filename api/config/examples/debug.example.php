<?php
/* This is an example file for your debug configuration */
return  [
    'bootstrap' => ['debug', 'gii'],
    'modules' => [
        'debug' => [
            'class' => 'yii\debug\Module'
        ],
        'gii' => [
            'class' => 'yii\gii\Module'
        ]
    ]
];
