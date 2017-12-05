<?php

use yii\db\Migration;

/**
 * Class m171205_080050_update_personFamily_add_ref
 */
class m171205_080050_update_personFamily_add_ref extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $this->addColumn('person_family','ref', $this->string());
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m171205_080050_update_personFamily_add_ref cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m171205_080050_update_personFamily_add_ref cannot be reverted.\n";

        return false;
    }
    */
}
