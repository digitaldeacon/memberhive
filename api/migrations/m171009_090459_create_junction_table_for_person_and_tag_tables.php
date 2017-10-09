<?php

use yii\db\Migration;

/**
 * Handles the creation of table `person_tag`.
 * Has foreign keys to the tables:
 *
 * - `person`
 * - `tag`
 */
class m171009_090459_create_junction_table_for_person_and_tag_tables extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('person_tag', [
            'person_id' => $this->integer(),
            'tag_id' => $this->integer(),
            'PRIMARY KEY(person_id, tag_id)',
        ]);

        // creates index for column `person_id`
        $this->createIndex(
            'idx-person_tag-person_id',
            'person_tag',
            'person_id'
        );

        // add foreign key for table `person`
        $this->addForeignKey(
            'fk-person_tag-person_id',
            'person_tag',
            'person_id',
            'person',
            'id',
            'CASCADE'
        );

        // creates index for column `tag_id`
        $this->createIndex(
            'idx-person_tag-tag_id',
            'person_tag',
            'tag_id'
        );

        // add foreign key for table `tag`
        $this->addForeignKey(
            'fk-person_tag-tag_id',
            'person_tag',
            'tag_id',
            'tag',
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
            'fk-person_tag-person_id',
            'person_tag'
        );

        // drops index for column `person_id`
        $this->dropIndex(
            'idx-person_tag-person_id',
            'person_tag'
        );

        // drops foreign key for table `tag`
        $this->dropForeignKey(
            'fk-person_tag-tag_id',
            'person_tag'
        );

        // drops index for column `tag_id`
        $this->dropIndex(
            'idx-person_tag-tag_id',
            'person_tag'
        );

        $this->dropTable('person_tag');
    }
}
