<?php

namespace app\controllers;

use app\models\Settings;
use yii\web\BadRequestHttpException;
use app\helpers\Access;

class SettingsController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['list','upsert', 'upsert-people-filter'],
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
        $settings = Settings::find()
            ->andWhere(['personId' => NULL])
            ->orWhere(['personId' => Access::userId()])
            ->all();
        foreach ($settings as $setting) {
            if ($setting->key == 'filter') {
                $ret[$setting->section]['filter']['filters'][] = json_decode($setting->value);
                // $ret[$setting->section]['filter']['current'] = '';
            } else {
                $ret[$setting->section][$setting->key] = json_decode($setting->value);
            }
        }
        return $ret;
    }

    public function actionUpsertPeopleFilter()
    {
        $ret = [];
        $post = \Yii::$app->request->post();
        $settings = $setting = Settings::findOne([
            'section'=>'people',
            'key'=>'filter',
            'personId'=>Access::userId()]);
        var_dump($post);
        return $ret;
    }

    public function actionUpsert()
    {
        $post = \Yii::$app->request->post();
        $ret = [];
        foreach ($post as $section => $data) {
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
