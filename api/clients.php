<?php

function getConfig()
{
    return json_decode(file_get_contents(API_BASE.'/clients.json'), true);
}

function getClient()
{
    $config = getConfig();
    $host = explode(':', $_SERVER['HTTP_HOST'])[0];
    $host = empty($host) ? 'localhost' : $host;
    $headers = APP_MODE == 'api' ? getallheaders() : [];
    $dbgView = explode('?', $_SERVER['REQUEST_URI'])[0] == ('/memberhive2/api/web/debug/default/view' ||
            '/memberhive2/api/web/debug/default/index');

    if (isset($headers['Client'])) {
        if(!isset($config[$host])) {
            die(json_encode("No such host (".$host.") exists!"));
        }
        if ($config[$host]['token'] !== $headers['Client']) {
            die(json_encode("Hostname and Token mismatch"));
        }
    } else {
        if(!$dbgView && !isset($config[$host])) {
            die(json_encode("No such host (".$host.") exists!"));
        }
    }

    return $config[$host];
}