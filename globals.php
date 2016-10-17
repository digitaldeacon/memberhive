<?php

use yii\helpers\ArrayHelper;
use yii\helpers\Html;

function param($name, $default = null)
{
    return ArrayHelper::getValue(Yii::$app->params, $name, $default);
}

function t($message, $params = [], $category = 'app', $language = null)
{
    return Yii::t($category, $message, $params, $language);
}

function url($url)
{
    return \yii\helpers\Url::to($url);
}