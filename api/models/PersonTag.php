<?php

namespace app\models;

/**
 * This is the model class for table "person_interaction".
 *
 * @property int $person_id
 * @property int $interaction_id
 * @property string $doneOn
 * @property int $completedBy
 * @property string $completedOn
 * @property string $response
 * @property int $delegatedBy
 * @property string $delegatedOn
 *
 * @property Interaction $interaction
 * @property Person $person
 */
class PersonTag extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'person_tag';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['person_id', 'tag_id'], 'required'],
            [['person_id', 'tag_id'], 'integer'],
            [['tag_id'], 'exist', 'skipOnError' => true,
                'targetClass' => Tag::className(),
                'targetAttribute' => ['tag_id' => 'id']],
            [['person_id'], 'exist', 'skipOnError' => true,
                'targetClass' => Person::className(),
                'targetAttribute' => ['person_id' => 'id']],
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
    public function getTag()
    {
        return $this->hasOne(Tag::className(), ['id' => 'tag_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPerson()
    {
        return $this->hasOne(Person::className(), ['id' => 'person_id']);
    }

    public function afterSave($insert, $changedAttributes)
    {
        parent::afterSave($insert, $changedAttributes);
        ActionLog::log(
            Tag::tableName(),
            $this->person->uid,
            $insert,
            $changedAttributes
        );
    }
}
