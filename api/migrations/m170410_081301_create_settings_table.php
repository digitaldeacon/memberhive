<?php

use yii\db\Migration;

/**
 * Handles the creation of table `settings`.
 */
class m170410_081301_create_settings_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable(
            'settings',
            [
                'id' => $this->primaryKey(),
                'key' => $this->string(),
                'value' => $this->text(),
                'personId' => $this->integer()
            ]
        );

        $this->addForeignKey(
            'fk-settings-personId',
            'settings',
            'personId',
            'person',
            'id',
            'CASCADE'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('settings');
    }
}
