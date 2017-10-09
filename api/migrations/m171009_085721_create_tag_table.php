<?php

use yii\db\Migration;

/**
 * Handles the creation of table `tag`.
 */
class m171009_085721_create_tag_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('tag', [
            'id' => $this->primaryKey(),
            'text' => $this->string(),
            'type' => $this->string(),
            'context' => $this->string(),
            'updated_at' => $this->integer(),
            'updated_by'=> $this->string()
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('tag');
    }
}
