<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "person_family".
 *
 * @property int $person_id
 * @property int $family_id
 * @property string $type
 *
 * @property Family $family
 * @property Person $person
 */
class PersonFamily extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'person_family';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['person_id', 'family_id'], 'required'],
            [['person_id', 'family_id'], 'integer'],
            [['role'], 'string', 'max' => 255],
            [['person_id', 'family_id'], 'unique', 'targetAttribute' => ['person_id', 'family_id']],
            [['family_id'], 'exist', 'skipOnError' => true, 'targetClass' => Family::className(), 'targetAttribute' => ['family_id' => 'id']],
            [['person_id'], 'exist', 'skipOnError' => true, 'targetClass' => Person::className(), 'targetAttribute' => ['person_id' => 'id']],
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
    public function getFamily()
    {
        return $this->hasOne(Family::className(), ['id' => 'family_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPerson()
    {
        return $this->hasOne(Person::className(), ['id' => 'person_id']);
    }
}
