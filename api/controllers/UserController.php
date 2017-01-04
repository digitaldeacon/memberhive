<?php
namespace app\controllers;
use app\models\User;

class UserController extends \yii\rest\ActiveController
{
    public $modelClass = 'app\models\User';

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['authenticator'] = [
            'class' => \yii\filters\auth\HttpBasicAuth::className(),
            'except' => ['login'],
        ];

        return $behaviors;
    }

    public function actionLogin()
    {
        $post = Yii::$app->request->post();
        $model = User::findOne(["username" => $post["username"]]);
        if (empty($model)) {
            throw new \yii\web\NotFoundHttpException('User not found');
        }
        if ($model->validatePassword($post["password"])) {
            $model->save(false);
            return $model->authKey; //return whole user model including auth_key or you can just return $model["auth_key"];
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