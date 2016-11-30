<?php

use yii\db\Migration;

class m161130_101533_create_person extends Migration
{
    public function up()
    {
        $this->createTable('person', [
            'id' => $this->primaryKey(),
            'firstName' => $this->string()->notNull(),
            'middleName' => $this->string(),
            'lastName' => $this->string()->notNull(),
            'nickName' => $this->string(),
            'prefix' => $this->string(10),
            'suffix' => $this->string(20),
            'email'  => $this->string()->notNull()->unique(),
            'authKey' => $this->string(),
            'passwordHash' => $this->string(),
            'passwordResetToken' => $this->string(),
            'passwordResetExpireDate' => $this->dateTime(),
            'gender' => $this->string(1),
            'address' => $this->text(),
            'tags' => $this->text(),
            'status' => $this->string(),
            'primaryContact' => $this->text(),
            'custom' => $this->text(),
            'avatarUrl' => $this->string(),
            'settings' => $this->text(),
            'language' => $this->string(),
            'lastLogin' => $this->dateTime(),
            'createdAt' => $this->dateTime(),
            'updatedAt' => $this->dateTime()
        ]);
    }

    public function down()
    {
        $this->dropTable('person');
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
