<?php

use yii\db\Migration;

class m170303_211650_create_table_person_custom extends Migration
{
    public function up()
    {
        $this->createTable('custom', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
            'label' => $this->string(),
            'type' => $this->string(),
            'icon' => $this->string(30),
            'position' => $this->integer(2),
            'groupWith' => $this->integer(),
            'validators' => $this->text(),
            'extraConfig' => $this->text(),
            'active' => $this->boolean()
        ]);

        // add foreign key for table `person`
        $this->addForeignKey(
            'fk-custom_custom_id',
            'custom',
            'groupWith',
            'custom',
            'id'
        );
    }

    public function down()
    {
        $this->dropTable('custom');
    }
}
