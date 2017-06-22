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
        foreach ($post as $section => $data) {
            $i = 0;
            foreach ($data as $key => $value) {
                $setting = Settings::findOne(['section'=>$section,'key'=>$key]);
                if ($setting) {
                    $setting->value = json_encode($value);
                    if (!$setting->save()) {
                        throw new BadRequestHttpException(json_encode($setting->errors));
                    }
                } else {
                    $setting = new Settings();
                    $setting->section = $section;
                    $setting->key = $key;
                    $setting->value = json_encode($value);
                    if (!$setting->save()) {
                        throw new BadRequestHttpException(json_encode($setting->errors));
                    }
                }
                $ret[$section][$key] = $setting->toResponseArray();
            }
        }

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
