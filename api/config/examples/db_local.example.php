<?php

return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=memberhive',
    'username' => '_MY_COOL_USER_',
    'password' => '_MY_COOL_PASSWORD_',
    'charset' => 'utf8',
    'enableSchemaCache' => false,
    // Duration of schema cache.
    'schemaCacheDuration' => 3600,
    // Name of the cache component used to store schema information
    'schemaCache' => 'cache'
];
