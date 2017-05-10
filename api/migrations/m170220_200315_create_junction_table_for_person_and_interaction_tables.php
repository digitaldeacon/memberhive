<?php

use yii\db\Migration;

/**
 * Handles the creation of table `person_interaction`.
 * Has foreign keys to the tables:
 *
 * - `person`
 * - `interaction`
 */
class m170220_200315_create_junction_table_for_person_and_interaction_tables extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable(
            'person_interaction', [
            'person_id' => $this->integer(),
            'interaction_id' => $this->integer(),
            'doneOn' => $this->dateTime(),
            'completedBy' => $this->integer(),
            'completedOn' => $this->dateTime(),
            'response' => $this->string(),
            'delegatedBy' => $this->integer(),
            'delegatedOn' => $this->dateTime(),
            'PRIMARY KEY(person_id, interaction_id)',
            ]
        );

        // creates index for column `person_id`
        $this->createIndex(
            'idx-person_interaction-person_id',
            'person_interaction',
            'person_id'
        );

        // add foreign key for table `person`
        $this->addForeignKey(
            'fk-person_interaction-person_id',
            'person_interaction',
            'person_id',
            'person',
            'id',
            'CASCADE'
        );

        // creates index for column `interaction_id`
        $this->createIndex(
            'idx-person_interaction-interaction_id',
            'person_interaction',
            'interaction_id'
        );

        // add foreign key for table `interaction`
        $this->addForeignKey(
            'fk-person_interaction-interaction_id',
            'person_interaction',
            'interaction_id',
            'interaction',
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
            'fk-person_interaction-person_id',
            'person_interaction'
        );

        // drops index for column `person_id`
        $this->dropIndex(
            'idx-person_interaction-person_id',
            'person_interaction'
        );

        // drops foreign key for table `interaction`
        $this->dropForeignKey(
            'fk-person_interaction-interaction_id',
            'person_interaction'
        );

        // drops index for column `interaction_id`
        $this->dropIndex(
            'idx-person_interaction-interaction_id',
            'person_interaction'
        );

        $this->dropTable('person_interaction');
    }
}
