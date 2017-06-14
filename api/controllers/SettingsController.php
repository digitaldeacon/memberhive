<?php

namespace app\controllers;

use app\models\Settings;
use yii\web\BadRequestHttpException;

class SettingsController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['list','update-or-create'],
                    'allow' => true,
                    'roles' => ['@'],
                ],
            ],
        ];
        return $behaviors;
    }

    /**
     * @inheritdoc
     */
    public function beforeAction($action)
    {
        if ($action->id == 'update-or-create') {
            $this->enableCsrfValidation = false;
        }

        return parent::beforeAction($action);
    }

    public function actionList()
    {
        $ret = [];
        $settings = Settings::find()->all();
        foreach ($settings as $setting) {
            $ret[$setting->section][$setting->key] = json_decode($setting->value);
        }
        /*throw new BadRequestHttpException(json_encode($ret));
        return [];*/
        return $ret;
    }

    public function actionUpdateOrCreate()
    {
        $post = \Yii::$app->request->post();
        $ret = [];
        // $r = '';
        foreach ($post as $section => $value) {
            // $r .= 'key: '.$key.' v: '.json_encode(array_keys($value)[0]);
            $key = isset(array_keys($value)[0]) ? array_keys($value)[0] : '';
            $setting = Settings::findOne(['section'=>$section,'key'=>$key]);
            $v = array_values($value)[0];
            if ($setting) {
                $setting->value = json_encode($v);
                if (!$setting->save()) {
                    throw new BadRequestHttpException(json_encode($setting->errors));
                }
            } else {
                $setting = new Settings();
                $setting->section = $section;
                $setting->key = $key;
                $setting->value = json_encode($v);
                if (!$setting->save()) {
                    throw new BadRequestHttpException(json_encode($setting->errors));
                }
            }
            $ret[$section][$key] = $setting->toResponseArray();
        }
        // throw new BadRequestHttpException(json_encode($r));
        /*throw new BadRequestHttpException($r);
        return[];
        $key = isset($post['key']) ? $post['key'] : null;

        if (!$key) {
            return [];
        }*/

        return $ret;
    }

    /**
     * @param $key
     * @return Settings
     */
    protected function findModel($key)
    {
        $settings = Settings::find()->where(['key'=>$key]);
        if ($settings === null) {
            throw new NotFoundHttpException('The requested setting does not exist.');
        }
        return $settings;
    }
}
