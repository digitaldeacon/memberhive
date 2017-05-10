<?php

use yii\db\Migration;

/**
 * Handles the creation of table `sermon_category`.
 */
class m170116_145746_create_sermon_category_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable(
            'sermon_category', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
            'code' => $this->string()
            ]
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('sermon_category');
    }
}
