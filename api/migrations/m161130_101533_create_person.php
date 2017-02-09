<?php

use yii\db\Migration;

class m161130_101533_create_person extends Migration
{
    public function up()
    {
        $this->createTable('person', [
            'id' => $this->string(36)->notNull(),

            'firstName' => $this->string()->notNull(),
            'middleName' => $this->string(),
            'lastName' => $this->string(),

            'nickName' => $this->string(),
            'prefix' => $this->string(),
            'suffix' => $this->string(),

            'gender' => $this->string(1),
            'email' => $this->string()->unique(),

            'maritalStatus' => $this->string(10),

            'birthday' => $this->date(),
            'baptized' => $this->date(),
            'deceased' => $this->date(),
            'anniversary' => $this->date(),

            'address' => $this->text(),
            'custom' => $this->text(),
            'avatarUrlSmall' => $this->string(),
            'avatarUrlMedium' => $this->string(),
            'avatarUrlBig' => $this->string(),
        ]);
    }

    public function down()
    {
        $this->dropTable('person');
    }


}
