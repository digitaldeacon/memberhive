<?php

use yii\db\Migration;

/**
 * Class m180312_140516_add_role_user_table
 */
class m180312_140516_add_role_user_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('user', 'role', $this->char(50));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('user', 'role');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180312_140516_add_role_user_table cannot be reverted.\n";

        return false;
    }
    */
}
