<?php

use yii\db\Migration;

/**
 * Handles the creation of table `import`.
 */
class m170209_132715_create_import_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable(
            'import',
            [
            'id' => $this->primaryKey(),
            'type' => $this->string(),
            'refTable' => $this->string(),
            'refId' => $this->integer(),
            'remoteId' => $this->string(36), //can store UUIDs
            'created_at' => $this->integer(11),
            'updated_at' => $this->integer(11)
            ]
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('import');
    }
}
