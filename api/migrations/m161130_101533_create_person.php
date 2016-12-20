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

            'prefix' => $this->string(),
            'suffix' => $this->string(),

            'gender' => $this->string(1),

            'address' => $this->text(),
            'custom' => $this->text(),
            'avatarUrl' => $this->string(),
        ]);
    }

    public function down()
    {
        $this->dropTable('person');
    }


}
