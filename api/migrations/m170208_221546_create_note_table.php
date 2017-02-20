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
            'text' => $this->text(),
            'typeId' => $this->integer(),
            'ownerId' => $this->string(36),
            'authorId' => $this->string(36),
            'dueOn' => $this->dateTime(),
            'isPrivate' => $this->boolean(),
            'created_at' => $this->integer(11),
            'updated_at' => $this->integer(11)
        ]);

        $this->createIndex(
            'idx-note-ownerId',
            'note',
            'ownerId');

        $this->createIndex(
            'idx-note-typeId',
            'note',
            'typeId'
        );

        /*$this->addForeignKey(
            'fk-note-typeId',
            'note', 'typeId',
            'note_type', 'id'
        );*/
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('note');
    }
}
