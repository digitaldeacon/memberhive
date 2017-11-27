<?php

namespace app\models;

use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "family".
 *
 * @property int $id
 * @property string $name
 *
 * @property PersonFamily[] $personFamilies
 * @property Person[] $people
 */
class Family extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'family';
    }

    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::className(),
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['updated_at'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => ['updated_at']
                ]
            ]
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name'], 'string', 'max' => 255],
            [['unrelated'], 'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonFamilies()
    {
        return $this->hasMany(PersonFamily::className(), ['family_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMembers()
    {
        return $this->hasMany(Person::className(), ['id' => 'person_id'])
            ->via('personFamilies');
    }

    public function toResponseArray()
    {
        $prim = [];
        $members = [];
        foreach ($this->personFamilies as $member) {
            if ($member->is_primary || $member->role == 'husband' || $member->role == 'wife') {
                $prim[$member->person->uid] = [
                    'role' => $member->role
                ];
            } else {
                $members[$member->person->uid] = [
                    'role' => $member->role
                ];
            }
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'primary' => $prim,
            'members' => $members,
            'unrelated' => json_decode($this->unrelated)
        ];
    }

    public function setPrimaryMember($personId, $isPrimary = true)
    {
        try {
            PersonFamily::updateAll(['is_primary' => false], ['person_id' => $personId]);
            if ($isPrimary) {
                $pfam = $this->getPersonFamilies()->andWhere(['person_id' => $personId])->one();
                $pfam->is_primary = true;
                $pfam->save();
            }
        } catch (\Throwable $e) {
            throw new BadRequestHttpException($e->getMessage());
        }
    }
}
