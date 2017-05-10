<?php
if (file_exists(__DIR__ . '/secrets.php')) {
    $secrets = include __DIR__ . '/secrets.php';
} else {
    $secrets = [];
}
return [
    'adminEmail' => 'queen@memberhive.com',
    'bugsEmail' => 'pw@ebtc-online.org',
    'secrets' => $secrets,
    'autoSaveInterval' => 21, //in secs
    'user.passwordResetTokenExpire' => 3600*24,
];
