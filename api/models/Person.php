<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "person".
 *
 * @property integer $id
 * @property string $firstName
 * @property string $middleName
 * @property string $lastName
 * @property string $nickName
 * @property string $prefix
 * @property string $suffix
 * @property string $email
 * @property string $authKey
 * @property string $passwordHash
 * @property string $passwordResetToken
 * @property string $passwordResetExpireDate
 * @property string $gender
 * @property string $address
 * @property string $tags
 * @property string $status
 * @property string $primaryContact
 * @property string $custom
 * @property string $avatarUrl
 * @property string $settings
 * @property string $language
 * @property string $lastLogin
 * @property string $createdAt
 * @property string $updatedAt
 */
class Person extends \yii\db\ActiveRecord
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
            [['firstName', 'middleName', 'lastName', 'nickName', 'email', 'authKey', 'passwordHash', 'passwordResetToken', 'status', 'avatarUrl', 'language'], 'string', 'max' => 255],
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
}
