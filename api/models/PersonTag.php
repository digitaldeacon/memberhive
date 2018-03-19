<?php

namespace app\models;

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
                'targetClass' => Tag::class,
                'targetAttribute' => ['tag_id' => 'id']],
            [['person_id'], 'exist', 'skipOnError' => true,
                'targetClass' => Person::class,
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
        return $this->hasOne(Tag::class, ['id' => 'tag_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPerson()
    {
        return $this->hasOne(Person::class, ['id' => 'person_id']);
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
