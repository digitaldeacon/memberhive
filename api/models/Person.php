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
            'address' => $this->address,
            'gender' => $this->gender,
            'birthday' => $this->birthday,
            'age' => $this->age,
            'maritalStatus' => $this->maritalStatus,
            'avatar' => $this->avatar,
            'address' => $this->address,
            // 'socialContact' => $this->socialContact,
            'phoneHome' => $this->phoneHome,
            'phoneWork' => $this->phoneWork,
            'phoneMobile' => $this->phoneMobile,
            'user' => [
                'username' => $this->user ? $this->user->username : ''
            ],
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
        return $this->hasMany(PersonNote::className(), ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNotes()
    {
        return $this->hasMany(Note::className(), ['id' => 'note_id'])
            ->viaTable('person_note', ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCustomFields()
    {
        return $this->hasMany(Custom::className(), ['id' => 'custom_id'])
            ->viaTable('person_custom', ['person_id' => 'id']);
    }

    public function getImport()
    {
        return $this->hasOne(Import::className(), ['refId' => 'id']);
    }

    public function getAvatar($size = 's')
    {
        $avatar_root = 'assets/images/avatar/';
        $default =  $avatar_root . $this->gender . '.png';
        $url = $this->avatarUrlSmall;
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
