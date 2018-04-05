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
    const SCENARIO_EDIT = 'edit';
    const SCENARIO_NEW = 'new';

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'person';
    }

    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios[self::SCENARIO_NEW] = [
            'firstName', 'lastName', 'email'
        ];
        $scenarios[self::SCENARIO_EDIT] = [
            'firstName', 'lastName', 'email', 'uid'
        ];
        return $scenarios;
    }

    public function behaviors()
    {
        return [
            \yii\behaviors\TimestampBehavior::class,
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
            [['uid', 'firstName', 'lastName'], 'required', 'on' => self::SCENARIO_EDIT],
            [['firstName', 'lastName'], 'required', 'on' => self::SCENARIO_NEW],
            [['birthday', 'baptized', 'deceased', 'anniversary'], 'safe'],
            [['address', 'custom', 'socialContact'], 'string'],
            [['created_at', 'updated_at'], 'integer'],
            [['uid'], 'string', 'max' => 36],
            [['firstName', 'middleName', 'lastName', 'nickName', 'prefix', 'suffix',
                'email', 'avatarUrlSmall', 'avatarUrlMedium', 'avatarUrlBig', 'phoneHome',
                'phoneWork', 'phoneMobile'], 'string', 'max' => 255],
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

    public function toResponseArray()
    {
        $interval = $this->ageInterval();
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
            'age' => $this->getAge($interval),
            'ageFormatted' => $this->getAgeFormatted($interval),
            'maritalStatus' => $this->maritalStatus,
            'avatar' => $this->avatar,
            'socialContact' => $this->socialContact,
            'phoneHome' => $this->phoneHome,
            'phoneWork' => $this->phoneWork,
            'phoneMobile' => $this->phoneMobile,
            'status' => $this->statusTags,
            'user' => [
                'username' => $this->user ? $this->user->username : ''
            ]
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonNotes()
    {
        return $this->hasMany(PersonInteraction::class, ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStatusTags()
    {
        return $this->hasMany(Tag::class, ['id' => 'tag_id'])->where(['type' => 'status'])
            ->viaTable('person_tag', ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonFamily()
    {
        return $this->hasOne(PersonFamily::class, ['person_id' => 'id'])
            ->andWhere(['is_primary' => true]);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonFamilies()
    {
        return $this->hasMany(PersonFamily::class, ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFamily()
    {
        return $this->hasOne(Family::class, ['id' => 'family_id'])
            ->via('personFamily');
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMyFamilies()
    {
        return $this->hasOne(Family::class, ['id' => 'family_id'])
            ->via('personFamily');
    }

    public function getUser()
    {
        return $this->hasOne(User::class, ['personId' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTags()
    {
        return $this->hasMany(Tag::class, ['id' => 'tag_id'])
            ->viaTable('person_tag', ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMyInteractions()
    {
        return $this->hasMany(Interaction::class, ['uid' => 'refId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getInteractions()
    {
        return $this->hasMany(Interaction::class, ['id' => 'interaction_id'])
            ->viaTable('person_interaction', ['person_id' => 'id']);
    }

    public function getImport()
    {
        return $this->hasOne(Import::class, ['refId' => 'id']);
    }

    public function getFullName()
    {
        return $this->firstName . ' ' . $this->lastName;
    }

    public function getFamilyMemberIds()
    {
        $f = function ($v) {
            return $v->uid;
        };
        return array_map($f, $this->family->members);
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

    public function getAge($interval)
    {
        if (empty($interval)) {
            return null;
        }
        $years = $interval->y;
        if ($years < 1) {
            $years = round($interval->days/365, 2);
        }
        return $years;
    }

    public function setRole($role)
    {
        try {
            $emptyRoles = $this->getPersonFamilies()->where(['role' => null])->all();
            foreach ($emptyRoles as $entry) {
                $entry->role = $role;
                $entry->ref = $this->uid;
                $entry->save();
            }
        } catch (\Throwable $e) {
            throw new BadRequestHttpException($e->getMessage());
        }
    }

    public function getRole()
    {
        $pfam = $this->getPersonFamily()->one();
        return !empty($pfam) ? $pfam->role : '';
    }

    public function setDefaultRole()
    {
        $this->role = $this->gender == 'm' ? 'husband' : 'wife';
    }

    public function setUser($user)
    {
        return $this->user = $user;
    }

    public function setAddressEmpty()
    {
        $this->address = $this->emptyAddress();
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

    private function ageInterval() {
        if (empty($this->birthday)) {
            return null;
        }
        $now = new \DateTime();
        $bDay = new \DateTime($this->birthday);
        return $bDay->diff($now);
    }

    private function getAgeFormatted($interval) {
        if (empty($interval)) {
            return null;
        }
        $years = $interval->y;
        return ($years < 1) ? $interval->format('%mm') : $years.'y';
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
}
