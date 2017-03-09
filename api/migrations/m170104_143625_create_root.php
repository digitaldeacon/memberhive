<?php

use yii\db\Migration;

class m170104_143625_create_root extends Migration
{
    public function up()
    {
        $person = new \app\models\Person();
        $person->firstName = 'Thomas';
        $person->lastName = 'Mustermann';
        $person->email = 'tm@example.com';
        $person->avatarUrlSmall = 'https://randomuser.me/api/portraits/men/31.jpg';
        $person->save();

        $user = new \app\models\User();
        $user->username = 'root';
        $user->setPassword('bibel');
        $user->personId = $person->id;
        $user->save();
    }

    public function down()
    {
        \app\models\User::deleteAll();
        return true;
    }
}
