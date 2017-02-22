<?php

use yii\db\Migration;

class m170217_102418_create_noteType_defaults extends Migration
{
    public function up()
    {
        $types = [
            ['type'=>'note','iconString'=>'comment'],
            ['type'=>'meeting','iconString'=>'forum'],
            ['type'=>'email','iconString'=>'email'],
            ['type'=>'phone','iconString'=>'contact_phone'],
            ['type'=>'interaction','iconString'=>'swap_vertical_circle'],
        ];

        foreach ($types as $key => $type) {
            $newType = new \app\models\NoteType();
            $newType->type = $type['type'];
            $newType->iconString = $type['iconString'];
            $newType->save();
        }

    }

    public function down()
    {
        \app\models\NoteType::deleteAll();
        return true;
    }

    /*
    // Use safeUp/safeDown to run migration code within a transaction
    public function safeUp()
    {
    }

    public function safeDown()
    {
    }
    */
}
