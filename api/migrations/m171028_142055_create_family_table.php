<?php

use yii\db\Migration;

/**
 * Handles the creation of table `family`.
 */
class m171028_142055_create_family_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('family', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
            'primary' => $this->text(),
            'unrelated' => $this->text(),
            'updated_at' => $this->integer(),
            'updated_by'=> $this->string()
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('family');
    }
}
