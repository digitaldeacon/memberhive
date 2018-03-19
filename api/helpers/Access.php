<?php

namespace app\helpers;

use app\models\User;

class Access
{
    /**
     * @return array
     */
    public static function roleNames()
    {
        return array_keys(\Yii::$app->authManager->getRoles());
    }

    /**
     * @return array
     */
    public static function roleDropDown()
    {
        $ret = [];
        foreach (\Yii::$app->authManager->getRoles() as $name => $role) {
            $ret[$name] = t($name);
        }
        return $ret;
    }

    /**
     * @return User
     */
    public static function user()
    {
        return User::findOne(\Yii::$app->user->id);
    }

    /**
     * @return bool
     */
    public static function loggedIn()
    {
        return !\Yii::$app->user->isGuest;
    }

    /**
     * @param string $permission
     * @return bool
     */
    public static function can($permission)
    {
        if (!Access::loggedIn()) {
            return false;
        }
        return Access::user()->can($permission);
    }

    /**
     * @return int|string
     */
    public static function userId()
    {
        return \Yii::$app->user->id;
    }

    /**
     * @param string $permission
     * @return array
     */
    public static function rolesByPermission($permission)
    {
        $ret = [];
        foreach (\Yii::$app->authManager->getRoles() as $name => $role) {
            if (in_array($permission, array_keys(\Yii::$app->authManager->getPermissionsByRole($name)))) {
                $ret[] = $name;
            }
        }
        return $ret;
    }

    /**
     * @return array
     */
    public static function possiblePermissions()
    {
        return array_keys(\Yii::$app->authManager->getPermissions());
    }

    /**
     * @param $permission
     * @return \yii\db\ActiveQuery
     */
    public static function usersByRole($permission)
    {
        return User::find()->where(['role' => Access::rolesByPermission($permission)]);
    }

    /**
     * @return boolean
     */
    public static function demo()
    {
        return \Yii::$app->params['config']['demo'] == true;
    }

    /**
     * @return boolean
     * This returns false on UnitTests. They run als a yii\web\Application
     */
    public static function console()
    {
        return is_a(\Yii::$app, 'yii\console\Application');
    }

    /**
     * Code is running on a ci, for example on gitlab
     * @return boolean
     */
    public static function onCI()
    {
        return Access::code() == 'gitlab';
    }
}
