<?php

namespace app\controllers;

use app\models\Settings;

class SettingsController extends MHController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => \yii\filters\AccessControl::className(),
            'rules' => [
                [
                    'actions' => ['list'],
                    'allow' => true,
                    'roles' => ['@'],
                ],
            ],
        ];
        return $behaviors;
    }

    public function actionList()
    {
        $ret = [];
        return $ret;
    }

    /**
     * @param $id
     * @return Note
     */
    protected function findModel($id)
    {
        $settings = Settings::findOne($id);
        if ($settings === null) {
            throw new NotFoundHttpException('The requested setting does not exist.');
        }
        return $settings;
    }
}
