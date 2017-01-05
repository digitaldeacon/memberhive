<?php

use yii\db\Migration;

class m170104_143625_create_root extends Migration
{
    public function up()
    {
        $user = new \app\models\User();
        $user->email = "test@memberhive.com";
        $user->username = "root";
        $user->setPassword("bibel");
        $user->save();
    }

    public function down()
    {
        echo "m170104_143625_create_root cannot be reverted.\n";

        return false;
    }

    /*
    // Use safeUp/safeDown to run migration code within a transaction
    public function safeUp()
    {
    }

    public function safeDown()
    {
    }
    */
}
