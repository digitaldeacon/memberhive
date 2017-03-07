<?php

use yii\db\Migration;

/**
 * Handles the creation of table `person_custom`.
 * Has foreign keys to the tables:
 *
 * - `person`
 * - `custom`
 */
class m170303_213014_create_junction_table_for_person_and_custom_tables extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('person_custom', [
            'person_id' => $this->integer(),
            'custom_id' => $this->integer(),
            'value' => $this->text(),
            'PRIMARY KEY(person_id, custom_id)',
        ]);

        // creates index for column `person_id`
        $this->createIndex(
            'idx-person_custom-person_id',
            'person_custom',
            'person_id'
        );

        // add foreign key for table `person`
        $this->addForeignKey(
            'fk-person_custom-person_id',
            'person_custom',
            'person_id',
            'person',
            'id',
            'CASCADE'
        );

        // creates index for column `custom_id`
        $this->createIndex(
            'idx-person_custom-custom_id',
            'person_custom',
            'custom_id'
        );

        // add foreign key for table `custom`
        $this->addForeignKey(
            'fk-person_custom-custom_id',
            'person_custom',
            'custom_id',
            'custom',
            'id',
            'CASCADE'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        // drops foreign key for table `person`
        $this->dropForeignKey(
            'fk-person_custom-person_id',
            'person_custom'
        );

        // drops index for column `person_id`
        $this->dropIndex(
            'idx-person_custom-person_id',
            'person_custom'
        );

        // drops foreign key for table `custom`
        $this->dropForeignKey(
            'fk-person_custom-custom_id',
            'person_custom'
        );

        // drops index for column `custom_id`
        $this->dropIndex(
            'idx-person_custom-custom_id',
            'person_custom'
        );

        $this->dropTable('person_custom');
    }
}
