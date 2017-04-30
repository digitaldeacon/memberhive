<?php

namespace app\models;

use \aracoool\uuid\Uuid;
use \aracoool\uuid\UuidBehavior;

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
                'class' => UuidBehavior::class,
                'version' => Uuid::V4,
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
            [['firstName', 'middleName', 'lastName', 'nickName', 'email', 'avatarUrlSmall', 'avatarUrlMedium', 'avatarUrlBig'], 'string', 'max' => 255],
            [['maritalStatus'], 'string', 'max' => 10],
            [['birthday', 'baptized', 'anniversary', 'deceased'], 'date', 'format' => 'php:Y-m-d'],
            [['gender'], 'string', 'max' => 1],
            [['created_at', 'updated_at'], 'integer'],
            ['uid', '\aracoool\uuid\UuidValidator'],
            [['address', 'socialContact'], 'string'],
            [['phoneHome','phoneWork', 'phoneMobile'], 'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
        ];
    }

    public function toResponseArray()
    {
        return [
            'id' => $this->id,
            'uid' => $this->uid,
            'fullName' => $this->fullName,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'middleName' => $this->middleName,
            'email' => $this->email,
            'address' => $this->address ? $this->address : ['home' => [], 'postal' => []],
            'gender' => $this->gender,
            'birthday' => $this->birthday,
            'age' => $this->age,
            'maritalStatus' => $this->maritalStatus,
            'avatar' => $this->avatar,
            'socialContact' => $this->socialContact,
            'phoneHome' => $this->phoneHome,
            'phoneWork' => $this->phoneWork,
            'phoneMobile' => $this->phoneMobile,
            'user' => [
                'username' => $this->user ? $this->user->username : ''
            ]
        ];
    }

    public function getFullName()
    {
        return $this->firstName . ' ' . $this->lastName;
    }

    public function getUser()
    {
        return $this->hasOne(User::className(), ['personId' => 'id']);
    }

    public function setUser($user)
    {
        return $this->user = $user;
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonNotes()
    {
        return $this->hasMany(PersonInteraction::className(), ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMyInteractions()
    {
        return $this->hasMany(Interaction::className(), ['uid' => 'ownerId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getInteractions()
    {
        return $this->hasMany(Interaction::className(), ['id' => 'interaction_id'])
            ->viaTable('person_interaction', ['person_id' => 'id']);
    }

    public function getImport()
    {
        return $this->hasOne(Import::className(), ['refId' => 'id']);
    }

    public function getAvatar($size = 's')
    {
        $avatar_root = 'assets/images/avatar/';
        $default =  $avatar_root . $this->gender . '.png';
        $url = empty($this->avatarUrlMedium) ? $this->avatarUrlSmall : $this->avatarUrlMedium;
        if (!empty($url)) {
            $parsed = parse_url($url);
            $url = empty($parsed['scheme']) ? $avatar_root . 'person/' . $url : $url;
        }
        return empty($url) ? $default : $url;
    }

    public function getAge()
    {
        if (empty($this->birthday)) {
            return null;
        }

        $now = new \DateTime();
        $bDay = new \DateTime($this->birthday);
        $interval = $bDay->diff($now);
        return $interval->y;
    }

    public function afterSave($insert, $changedAttributes)
    {
        parent::afterSave($insert, $changedAttributes);

        ActionLog::log(
            Person::tableName(),
            $this->uid,
            $insert,
            $changedAttributes
        );
    }
}
