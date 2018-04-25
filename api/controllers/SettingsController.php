<?php

namespace app\controllers;

use app\models\Settings;
use app\helpers\Access;
use yii\web\BadRequestHttpException;
use yii\web\UnprocessableEntityHttpException;
use app\enums\SettingSection;

class SettingsController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::class,
            'rules' => [
                [
                    'actions' => ['list','upsert', 'upsert-people-filter', 'delete-people-filter'],
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
        $allowed = ['upsert', 'upsert-people-filter', 'delete-people-filter'];
        if (in_array($action->id, $allowed)) {
            $this->enableCsrfValidation = false;
        }
        return parent::beforeAction($action);
    }

    public function actionList()
    {
        $ret = [];
        $settings = Settings::find()
            ->andWhere(['personId' => null])
            ->orWhere(['personId' => Access::userId()])
            ->all();
        foreach ($settings as $setting) {
            if ($setting->key == 'filter') {
                $ret[$setting->section]['filter']['saved'][] = json_decode($setting->value);
            } else {
                $ret[$setting->section][$setting->key] = json_decode($setting->value);
            }
        }
        return $ret;
    }

    public function actionUpsertPeopleFilter()
    {
        $post = \Yii::$app->request->post();
        if (!isset($post['term'])) {
            throw new BadRequestHttpException('Missing parameter "term"');
        }
        $term = trim($post['term']);
        $setting = null;

        try {
            $settings = $setting = Settings::findOne([
                'section'=>SettingSection::PEOPLE,
                'key'=>'filter',
                'value'=>json_encode($term),
                'personId'=>Access::userId()]);
            if (!$settings) {
                $setting = new Settings();
                $setting->section = SettingSection::PEOPLE;
                $setting->personId = Access::userId();
                $setting->key = 'filter';
                $setting->value = json_encode($term);
                $setting->save();
            }
        } catch (\Throwable $e) {
            throw new UnprocessableEntityHttpException(json_encode($e->getMessage()));
        }
        return $setting->toResponseArray();
    }

    public function actionDeletePeopleFilter()
    {
        $post = \Yii::$app->request->post();
        if (!isset($post['term'])) {
            throw new BadRequestHttpException('Missing parameter "term"');
        }
        $term = trim($post['term']);
        $setting = null;

        try {
            $settings = $setting = Settings::findOne([
                'section'=>SettingSection::PEOPLE,
                'key'=>'filter',
                'value'=>json_encode($term),
                'personId'=>Access::userId()]);
            if ($settings) {
                $setting->delete();
            }
        } catch (\Throwable $e) {
            throw new UnprocessableEntityHttpException(json_encode($e->getMessage()));
        }
        return $term;
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
