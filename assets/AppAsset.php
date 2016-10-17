<?php
namespace app\assets;
use yii\web\AssetBundle;

class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/components.css',
        'css/core.css',
        'css/menu.css',
        'css/pages.css',
        'css/bibelkunde.css',
        'css/responsive.css',
        'stylesheets/waves.css',
        'stylesheets/summernote.css',
        'stylesheets/materialdesignicons.min.css',
    ];
    public $js = [
        'js/detect.js',
        'js/fastclick.js',
        'js/waves.min.js',
        'js/bootbox.min.js',
        'js/summernote.min.js',
        'js/app.js',
        'js/confirm.js'
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapPluginAsset',
    ];
}
