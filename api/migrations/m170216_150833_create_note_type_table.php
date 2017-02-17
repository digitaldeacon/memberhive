<?php

use yii\db\Migration;

/**
 * Handles the creation of table `note_type`.
 */
class m170216_150833_create_note_type_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('note_type', [
            'id' => $this->primaryKey(),
            'type' => $this->string(),
            'iconString' => $this->string()
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('note_type');
    }
}
