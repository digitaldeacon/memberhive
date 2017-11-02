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

    if (isset($headers['Client'])) {
        if(!isset($config[$host])) {
            die(json_encode("No such host (".$host.") exists!"));
        }
        if ($config[$host]['token'] !== $headers['Client']) {
            die(json_encode("Hostname and Token mismatch"));
        }
    } else {
        if(!isset($config[$host])) {
            die(json_encode("No such host (".$host.") exists!"));
        }
    }

    return $config[$host];
}