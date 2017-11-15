<?php

use yii\db\Migration;

/**
 * Handles the creation of table `person_family`.
 * Has foreign keys to the tables:
 *
 * - `person`
 * - `family`
 */
class m171031_093319_create_junction_table_for_person_and_family_tables extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('person_family', [
            'person_id' => $this->integer(),
            'family_id' => $this->integer(),
            'role' => $this->string(),
            'PRIMARY KEY(person_id, family_id)',
        ]);

        // creates index for column `person_id`
        $this->createIndex(
            'idx-person_family-person_id',
            'person_family',
            'person_id'
        );

        // add foreign key for table `person`
        $this->addForeignKey(
            'fk-person_family-person_id',
            'person_family',
            'person_id',
            'person',
            'id',
            'RESTRICT'
        );

        // creates index for column `family_id`
        $this->createIndex(
            'idx-person_family-family_id',
            'person_family',
            'family_id'
        );

        // add foreign key for table `family`
        $this->addForeignKey(
            'fk-person_family-family_id',
            'person_family',
            'family_id',
            'family',
            'id',
            'RESTRICT'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        // drops foreign key for table `person`
        $this->dropForeignKey(
            'fk-person_family-person_id',
            'person_family'
        );

        // drops index for column `person_id`
        $this->dropIndex(
            'idx-person_family-person_id',
            'person_family'
        );

        // drops foreign key for table `family`
        $this->dropForeignKey(
            'fk-person_family-family_id',
            'person_family'
        );

        // drops index for column `family_id`
        $this->dropIndex(
            'idx-person_family-family_id',
            'person_family'
        );

        $this->dropTable('person_family');
    }
}
