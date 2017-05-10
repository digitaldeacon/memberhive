<?php

use yii\db\Migration;

class m161130_101533_create_person extends Migration
{
    public function up()
    {
        $this->createTable(
            'person', [
            'id' => $this->primaryKey(),
            'uid' => $this->string(36)->notNull(),

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
            'custom' => $this->text(), // custom fields? how should we search them from here?

            'avatarUrlSmall' => $this->string(),
            'avatarUrlMedium' => $this->string(),
            'avatarUrlBig' => $this->string(),

            'phoneHome' => $this->string(),
            'phoneWork' => $this->string(),
            'phoneMobile' => $this->string(),

            'socialContact' => $this->text(),

            'created_at' => $this->integer(11),
            'updated_at' => $this->integer(11)
            ]
        );
    }

    public function down()
    {
        $this->dropTable('person');
    }
}
