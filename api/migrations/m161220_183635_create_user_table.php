<?php

use yii\db\Migration;

/**
 * Handles the creation of table `user`.
 */
class m161220_183635_create_user_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('user', [
            'id' => $this->primaryKey(),
            'username' => $this->string()->unique(),
            'authKey' => $this->string(),
            'accessToken' => $this->string(),
            'passwordHash' => $this->string(),
            'passwordResetToken' => $this->string(),
            'passwordResetExpireDate' => $this->dateTime(),
            'personId' => $this->string(36)
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('user');
    }
}
