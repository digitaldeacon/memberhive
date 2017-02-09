<?php

use yii\db\Migration;

/**
 * Handles the creation of table `note`.
 */
class m170208_221546_create_note_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('note', [
            'id' => $this->primaryKey(),
            'title' => $this->text(),
            'text' => $this->text(),
            'typeId' => $this->integer(),
            'ownerId' => $this->string(36),
            'isPrivate' => $this->boolean(),
            'createdAt' => $this->dateTime(),
            'updatedAt' => $this->dateTime()
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('note');
    }
}
