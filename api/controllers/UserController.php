<?php
namespace app\controllers;
use app\models\User;

class UserController extends MHController
{
    public $modelClass = 'app\models\User';


    public function actionLogin()
    {
        $post = \Yii::$app->request->post();
        if(empty($post)) {
            return [];
        }
        $model = User::findOne(["username" => $post["username"]]);
        if (empty($model)) {
            throw new \yii\web\NotFoundHttpException('User not found');
        }
        if ($model->validatePassword($post["password"])) {
            $model->save(false);
            return ['token' => $model->authKey]; //return whole user model including auth_key or you can just return $model["auth_key"];
        } else {
            throw new \yii\web\ForbiddenHttpException();
        }
    }


    public function actionLogout()
    {
        Yii::$app->user->logout();
        return;
    }

}