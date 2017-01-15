<?php

namespace app\models;

/**
 * Class Person
 * @package app\models
 *
 * @property $firstName string
 * @property $lastName string
 * @property $fullName string
 * @property $gender string
 * @property $avatarUrlSmall string
 * @property $avatarUrlMedium string
 * @property $avatarUrlBig string
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
            [['firstName'], 'required'],
            [['firstName', 'middleName', 'lastName', 'nickName', 'avatarUrlSmall', 'avatarUrlMedium', 'avatarUrlBig'], 'string', 'max' => 255],
            [['gender'], 'string', 'max' => 1],
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
            'gender' => 'Gender',
            'address' => 'Address',
            'tags' => 'Tags',
            'status' => 'Status',
            'primaryContact' => 'Primary Contact',
            'custom' => 'Custom',
            'avatarUrl' => 'Avatar Url',
            'settings' => 'Settings',
            'language' => 'Language',
            'createdAt' => 'Created At',
            'updatedAt' => 'Updated At',
        ];
    }

    public function toResponseArray()
    {
        return [
            'id' => $this->id,
            'fullName' => $this->fullName,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'avatarUrlSmall' => $this->avatarUrlSmall,
            'avatarUrlMedium' => $this->avatarUrlMedium,
            'avatarUrlBig' => $this->avatarUrlBig,
        ];
    }

    public function getFullName()
    {
        return $this->firstName . ' ' . $this->lastName;
    }


}
