<?php

namespace app\models;

use yii\web\IdentityInterface;

class Person extends \yii\db\ActiveRecord implements IdentityInterface
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'person';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['firstName', 'lastName', 'email'], 'required'],
            [['passwordResetExpireDate', 'lastLogin', 'createdAt', 'updatedAt'], 'safe'],
            [['address', 'tags', 'primaryContact', 'custom', 'settings'], 'string'],
            [['firstName', 'middleName', 'lastName', 'nickName', 'email', 'authKey', 'passwordHash', 'accessToken', 'passwordResetToken', 'status', 'avatarUrl', 'language'], 'string', 'max' => 255],
            [['prefix'], 'string', 'max' => 10],
            [['suffix'], 'string', 'max' => 20],
            [['gender'], 'string', 'max' => 1],
            [['email'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'firstName' => 'First Name',
            'middleName' => 'Middle Name',
            'lastName' => 'Last Name',
            'nickName' => 'Nick Name',
            'prefix' => 'Prefix',
            'suffix' => 'Suffix',
            'email' => 'Email',
            'authKey' => 'Auth Key',
            'passwordHash' => 'Password Hash',
            'passwordResetToken' => 'Password Reset Token',
            'passwordResetExpireDate' => 'Password Reset Expire Date',
            'gender' => 'Gender',
            'address' => 'Address',
            'tags' => 'Tags',
            'status' => 'Status',
            'primaryContact' => 'Primary Contact',
            'custom' => 'Custom',
            'avatarUrl' => 'Avatar Url',
            'settings' => 'Settings',
            'language' => 'Language',
            'lastLogin' => 'Last Login',
            'createdAt' => 'Created At',
            'updatedAt' => 'Updated At',
        ];
    }

    /**
     * Finds an identity by the given token.
     *
     * @param string $token the token to be looked for
     * @return IdentityInterface|null the identity object that matches the given token.
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['accessToken' => $token]);
    }

    /**
     * @return int|string current user ID
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string current user auth key
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    /**
     * @param string $authKey
     * @return boolean if auth key is valid for current user
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    public static function findIdentity($id)
    {
        return static::findOne($id);
    }
}
