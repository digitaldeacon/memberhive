<?php
if(file_exists(__DIR__ . '/secrets.php')) {
    $secrets = require(__DIR__ . '/secrets.php');
} else {
    $secrets = [];
}
return [
    'adminEmail' => 'bko@ebtc-online.org',
    'bugsEmail' => 'pw@ebtc-online.org',
    'secrets' => $secrets,
    'autoSaveInterval' => 21, //in secs
    'user.passwordResetTokenExpire' => 3600*24,
];
