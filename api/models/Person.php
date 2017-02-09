<?php

namespace app\models;

/**
 * Class Person
 * @package app\models
 *
 * @property string $firstName
 * @property string $lastName
 * @property string $fullName
 * @property string $gender
 * @property string $avatarUrlSmall
 * @property string $avatarUrlMedium
 * @property string $avatarUrlBig
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

    public function behaviors()
    {
        return [
            \yii\behaviors\TimestampBehavior::className(),
            [
                'class' => \aracoool\uuid\UuidBehavior::class,
                'defaultAttribute' => 'uid'
            ]
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['firstName'], 'required'],
            [['firstName','middleName','lastName','nickName','email','avatarUrlSmall','avatarUrlMedium','avatarUrlBig'], 'string', 'max' => 255],
            [['maritalStatus'], 'string','max'=>10],
            [['birthday','baptized','anniversary','deceased'], 'date', 'format' => 'php:Y-m-d'],
            [['gender'], 'string', 'max' => 1],
            [['created_at', 'updated_at'], 'integer'],
            ['uid', '\aracoool\uuid\UuidValidator']
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
            'email' => $this->email,
            'address' => $this->address,
            'gender' => $this->gender,
            'birthday' => $this->birthday,
            'maritalStatus' => $this->maritalStatus,
            'avatarUrlSmall' => $this->avatarUrlSmall,
            'avatarUrlMedium' => $this->avatarUrlMedium,
            'avatarUrlBig' => $this->avatarUrlBig,
            'avatar' => $this->avatar,
        ];
    }

    public function getFullName()
    {
        return $this->firstName . ' ' . $this->lastName;
    }

    public function getAvatar($size='s')
    {
        $default = 'assets/images/avatar/'.$this->gender.'.png';
        return empty($this->avatarUrlSmall) ? $default : $this->avatarUrlSmall;
    }
}
