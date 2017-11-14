<?php

namespace app\models;

use \aracoool\uuid\Uuid;
use \aracoool\uuid\UuidBehavior;
use \app\models\Family;

/**
 * Class Person
 *
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
            [['uid', 'firstName'], 'required'],
            [['birthday', 'baptized', 'deceased', 'anniversary'], 'safe'],
            [['address', 'custom', 'socialContact'], 'string'],
            [['created_at', 'updated_at'], 'integer'],
            [['uid'], 'string', 'max' => 36],
            [['firstName', 'middleName', 'lastName', 'nickName', 'prefix', 'suffix', 'email', 'avatarUrlSmall', 'avatarUrlMedium', 'avatarUrlBig', 'phoneHome', 'phoneWork', 'phoneMobile'], 'string', 'max' => 255],
            [['maritalStatus'], 'string', 'max' => 50],
            [['birthday', 'baptized', 'anniversary', 'deceased'], 'date', 'format' => 'php:Y-m-d'],
            [['gender'], 'string', 'max' => 1],
            [['created_at', 'updated_at'], 'integer'],
            ['uid', '\aracoool\uuid\UuidValidator'],
            [['address', 'socialContact'], 'string'],
            [['phoneHome','phoneWork', 'phoneMobile'], 'string'],
            [['email'], 'unique']
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
        $family = $this->family;
        $familyMember = $this->personFamily;
        return [
            'id' => $this->id,
            'uid' => $this->uid,
            'fullName' => $this->fullName,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'middleName' => $this->middleName,
            'email' => $this->email,
            'address' => $this->address ? json_decode($this->address) : $this->emptyAddress(),
            'gender' => $this->gender,
            'birthday' => $this->birthday,
            'baptized' => $this->baptized,
            'anniversary' => $this->anniversary,
            'age' => $this->age,
            'maritalStatus' => $this->maritalStatus,
            'avatar' => $this->avatar,
            'socialContact' => $this->socialContact,
            'phoneHome' => $this->phoneHome,
            'phoneWork' => $this->phoneWork,
            'phoneMobile' => $this->phoneMobile,
            'status' => $this->statusTags,
            'user' => [
                'username' => $this->user ? $this->user->username : ''
            ],
            'family' => !empty($family) ? [
                'id' => $family->id,
                'role' => $familyMember->role
            ] : []
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
    public function getStatusTags()
    {
        return $this->hasMany(Tag::className(), ['id' => 'tag_id'])->where(['type' => 'status'])
            ->viaTable('person_tag', ['person_id' => 'id']);
    }

    public function getPersonFamily()
    {
        return $this->hasOne(PersonFamily::className(), ['person_id' => 'id']);
    }
    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFamily()
    {
        return $this->hasOne(Family::className(), ['id' => 'family_id'])->viaTable('person_family', ['person_id' => 'id']);
    }

    public function getFamilyMemberIds()
    {
        $f = function ($v) {
            return $v->uid;
        };
        return array_map($f, $this->family->members);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTags()
    {
        return $this->hasMany(Tag::className(), ['id' => 'tag_id'])
            ->viaTable('person_tag', ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMyInteractions()
    {
        return $this->hasMany(Interaction::className(), ['uid' => 'refId']);
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

    private function emptyAddress()
    {
        return json_encode([
            'home' => [
                'street' => '',
                'city' => '',
                'zip' => '',
                'geocode' => []
            ],
            'postal' => [
                'street' => '',
                'city' => '',
                'zip' => '',
                'geocode' => []
            ]
        ]);
    }

    public function setAddressEmpty()
    {
        $this->address = $this->emptyAddress();
    }
}
