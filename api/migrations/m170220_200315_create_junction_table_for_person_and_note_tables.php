<?php

use yii\db\Migration;

/**
 * Handles the creation of table `person_note`.
 * Has foreign keys to the tables:
 *
 * - `person`
 * - `note`
 */
class m170220_200315_create_junction_table_for_person_and_note_tables extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('person_note', [
            'person_id' => $this->integer(),
            'note_id' => $this->integer(),
            'doneOn' => $this->dateTime(),
            'response' => $this->string(),
            'delegatedBy' => $this->integer(),
            'delegatedOn' => $this->dateTime(),
            'PRIMARY KEY(person_id, note_id)',
        ]);

        // creates index for column `person_id`
        $this->createIndex(
            'idx-person_note-person_id',
            'person_note',
            'person_id'
        );

        // add foreign key for table `person`
        $this->addForeignKey(
            'fk-person_note-person_id',
            'person_note',
            'person_id',
            'person',
            'id',
            'CASCADE'
        );

        // creates index for column `note_id`
        $this->createIndex(
            'idx-person_note-note_id',
            'person_note',
            'note_id'
        );

        // add foreign key for table `note`
        $this->addForeignKey(
            'fk-person_note-note_id',
            'person_note',
            'note_id',
            'note',
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
            'fk-person_note-person_id',
            'person_note'
        );

        // drops index for column `person_id`
        $this->dropIndex(
            'idx-person_note-person_id',
            'person_note'
        );

        // drops foreign key for table `note`
        $this->dropForeignKey(
            'fk-person_note-note_id',
            'person_note'
        );

        // drops index for column `note_id`
        $this->dropIndex(
            'idx-person_note-note_id',
            'person_note'
        );

        $this->dropTable('person_note');
    }
}
