<?php
$params = [
    'adminEmail' => 'queen@memberhive.com',
    'bugsEmail' => 'pw@ebtc-online.org',
    'autoSaveInterval' => 21, //in secs
    'user.passwordResetTokenExpire' => 3600*24,
];

if (file_exists(__DIR__ . '/secrets.php')) {
    $params = array_merge($params, include __DIR__ . '/secrets.php');
}

return $params;
