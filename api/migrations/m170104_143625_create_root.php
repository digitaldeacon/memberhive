<?php

use yii\db\Migration;

class m170104_143625_create_root extends Migration
{
    public function up()
    {
        $user = new \app\models\User();
        $user->username = "root";
        $user->setPassword("bibel");
        $user->save();
    }

    public function down()
    {
        \app\models\User::deleteAll();
        return true;
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
