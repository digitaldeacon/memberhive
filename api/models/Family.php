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
    public function getPersonFamily()
    {
        return $this->hasMany(PersonFamily::className(), ['family_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMembers()
    {
        return $this->hasMany(Person::className(), ['id' => 'person_id'])
            ->via('personFamily');
    }

    public function toResponseArray()
    {
        $familyMembers = PersonFamily::find()
            ->with('person')
            ->where([
                'family_id' => $this->id
            ])
            /*->andWhere(['or',
                ['role' => 'husband'],
                ['role' => 'wife']])*/
            ->all();
        $prim = [];
        $members = [];
        foreach ($familyMembers as $member) {
            $members[$member->person->uid] = [
                'role' => $member->role
            ];
            if ($member->role == 'husband' || $member->role == 'wife') {
                array_push($prim, $member->person->uid);
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
}
