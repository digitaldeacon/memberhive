<?php
// comment out the following two lines when deployed to production
if(!file_exists(__DIR__.'/../config/debug.php'))
{
    define('YII_DEBUG', false);
}
else
{
    define('YII_DEBUG', true);
    define('YII_ENV', 'dev');
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}

require(__DIR__ . '/../vendor/autoload.php');
require(__DIR__ . '/../vendor/yiisoft/yii2/Yii.php');

if(YII_DEBUG === true) {
    function stacktrace_error_handler($errno,$message,$file,$line,$context)
    {
        if($errno === E_WARNING) {
            throw new \yii\base\Exception($message);
        }
        return false; // to execute the regular error handler
    }
    set_error_handler("stacktrace_error_handler");

}

$config = require(__DIR__ . '/../config/web.php');

(new yii\web\Application($config))->run();
