<?php

use yii\db\Migration;

/**
 * Class m171205_081903_update_personFamily_refEntries
 */
class m171205_081903_update_personFamily_refEntries extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $pfam = \app\models\PersonFamily::find()
            ->with('person')
            ->where(['ref' => NULL])
            ->all();
        foreach ($pfam as $data) {
            $data->ref = $data->person->uid;
            $data->save();
        }
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m171205_081903_update_personFamily_refEntries cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m171205_081903_update_personFamily_refEntries cannot be reverted.\n";

        return false;
    }
    */
}
