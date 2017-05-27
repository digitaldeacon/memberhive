<?php

use yii\db\Migration;

/**
 * Handles the creation of table `interaction`.
 */
class m170208_221546_create_interaction_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable(
            'interaction', [
            'id' => $this->primaryKey(),
            'uid' => $this->string(36),
            'text' => $this->text(),
            'type' => $this->string(),
            'ownerId' => $this->string(36),
            'authorId' => $this->string(36),
            'dueOn' => $this->dateTime(),
            'isPrivate' => $this->boolean(),
            'created_at' => $this->integer(11),
            'updated_at' => $this->integer(11)
            ]
        );

        $this->createIndex(
            'idx-interaction-ownerId',
            'interaction',
            'ownerId'
        );

        $this->createIndex(
            'idx-interaction-authorId',
            'interaction',
            'authorId'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('interaction');
    }
}
