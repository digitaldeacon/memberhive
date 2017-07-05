<?php

use yii\db\Migration;

class m170705_104355_interaction_add_actionType extends Migration
{
    public function safeUp()
    {
        $this->addColumn('interaction', 'actionType', $this->string(36));
    }

    public function safeDown()
    {
        $this->dropColumn('interaction', 'actionType');
    }
}
