<?php

use yii\db\Migration;

/**
 * Handles the creation of table `sermon`.
 */
class m170116_145747_create_sermon_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('sermon', [
            'id' => $this->primaryKey(),
            'title' => $this->string(),
            'language' => $this->string(),
            'picture' => $this->string(),
            'notes' => $this->text(),
            'filesJson' => $this->text(),
            'scripturesJson' => $this->text(),
            'date' => $this->date(),
            'hits' => $this->integer(),
            'sermonCategoryId' => $this->integer()
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('sermon');
    }
}
