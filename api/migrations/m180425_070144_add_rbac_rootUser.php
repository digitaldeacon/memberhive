<?php

use yii\db\Migration;

/**
 * Class m180425_070144_add_rbac_rootUser
 */
class m180425_070144_add_rbac_rootUser extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $user = \app\models\User::findOne(['id'=>1]);
        if ($user) {
            try {
                $auth = \Yii::$app->authManager;
                $roleObject = $auth->getRole('admin');
                if (!$roleObject) {
                    throw new InvalidParamException("There is no role ADMIN.");
                }
                $auth->assign($roleObject, $user->id);
                $user->role = 'admin';
                $user->save();
            } catch (\Throwable $e) {
                echo $e->getMessage();
            }
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $user = \app\models\User::findOne(['id'=>1]);
        if ($user) {
            try {
                $auth = \Yii::$app->authManager;
                $roleObject = $auth->getRole('admin');
                if (!$roleObject) {
                    throw new InvalidParamException("There is no role ADMIN.");
                }
                $auth->removeAllAssignments();
                $user->role = NULL;
                $user->save();
            } catch (\Throwable $e) {
                echo $e->getMessage();
            }
        }
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180425_070144_add_rbac_rootUser cannot be reverted.\n";

        return false;
    }
    */
}
