<?php

namespace app\models;

class Tag extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tag';
    }

    public function behaviors()
    {
        return [
            \yii\behaviors\TimestampBehavior::className()
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['text','type','context'], 'required'],
            [['text','type','context','updated_by'], 'string'],
            [['updated_at'], 'integer'],
            [['updated_at'], 'safe']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [];
    }

    public function toResponseArray()
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
            'type' => $this->type,
            'context' => $this->context,
            'updated_at' => $this->updated_at,
            'updated_by' => $this->updated_by
        ];
    }
}
