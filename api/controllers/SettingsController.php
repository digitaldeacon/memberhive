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
            $ret[$setting->key] = json_decode($setting->value);// $setting->toResponseArray();
        }
        /*throw new BadRequestHttpException(json_encode($ret));
        return [];*/
        return $ret;
    }

    public function actionUpdateOrCreate()
    {
        $post = \Yii::$app->request->post();
        $ret = [];
        foreach ($post as $key => $value) {
            // $r .= $key.'v: '.json_encode($value);
            $setting = Settings::findOne(['key'=>$key]);
            if ($setting) {
                $setting->value = json_encode($value);
                if (!$setting->save()) {
                    throw new BadRequestHttpException(json_encode($setting->errors));
                }
            } else {
                $setting = new Settings();
                $setting->key = $key;
                $setting->value = json_encode($value);
                if (!$setting->save()) {
                    throw new BadRequestHttpException(json_encode($setting->errors));
                }
            }
            $ret[$key] = $setting->toResponseArray();
        }

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
