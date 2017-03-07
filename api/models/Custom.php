<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "custom".
 *
 * @property int $id
 * @property string $name
 * @property string $type
 * @property string $icon
 * @property int $position
 * @property int $groupWith
 * @property string $validators
 * @property string $extraConfig
 * @property int $active
 *
 * @property Custom $groupWith0
 * @property Custom[] $customs
 * @property PersonCustom[] $personCustoms
 * @property Person[] $people
 */
class Custom extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'custom';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['position', 'groupWith', 'active'], 'integer'],
            [['validators', 'extraConfig'], 'string'],
            [['name', 'type'], 'string', 'max' => 255],
            [['icon'], 'string', 'max' => 30],
            [['groupWith'], 'exist', 'skipOnError' => true, 'targetClass' => Custom::className(), 'targetAttribute' => ['groupWith' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'type' => 'Type',
            'icon' => 'Icon',
            'position' => 'Position',
            'groupWith' => 'Group With',
            'validators' => 'Validators',
            'extraConfig' => 'Extra Config',
            'active' => 'Active',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getGroupWith0()
    {
        return $this->hasOne(Custom::className(), ['id' => 'groupWith']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCustoms()
    {
        return $this->hasMany(Custom::className(), ['groupWith' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonCustoms()
    {
        return $this->hasMany(PersonCustom::className(), ['custom_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPeople()
    {
        return $this->hasMany(Person::className(), ['id' => 'person_id'])->viaTable('person_custom', ['custom_id' => 'id']);
    }
}
