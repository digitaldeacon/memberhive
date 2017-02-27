<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "note".
 *
 * @property int $id
 * @property string $title
 * @property string $text
 * @property int $typeId
 * @property string $ownerId
 * @property int $isPrivate
 * @property string $createdAt
 * @property string $updatedAt
 */
class Note extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'note';
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
            [['text','ownerId', 'typeId'], 'required'],
            [['text'], 'string'],
            [['typeId', 'isPrivate'], 'integer'],
            [['created_at', 'updated_at', 'dueOn'], 'safe'],
            [['ownerId'], 'string', 'max' => 36],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'text' => 'Text',
            'typeId' => 'Type ID',
            'ownerId' => 'Owner ID',
            'isPrivate' => 'Is Private',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    public function getType()
    {
        return $this->hasOne(NoteType::className(), ['id' => 'typeId']);
    }

    public function getOwner()
    {
        return $this->hasOne(Person::className(), ['uid' => 'ownerId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonNotes()
    {
        return $this->hasMany(PersonNote::className(), ['note_id' => 'id']);
    }

    public function toResponseArray()
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
            'authorName' => isset($this->author) ? $this->author->fullName : '',
            'ownerId' => $this->ownerId,
            'type' => $this->type->type,
            'icon' => $this->type->iconString,
            'isPrivate' => $this->isPrivate,
            'createdAt' => date('Y-M-d H:i',$this->created_at),
            'updatedAt' => date('Y-M-d H:i',$this->updated_at),
        ];
    }

    public function afterSave($insert, $changedAttributes)
    {
        parent::afterSave($insert, $changedAttributes);

        $refUser = 1;

        ActionLog::log(
            Note::tableName(),
            $this->id,
            $refUser,
            $insert,
            $changedAttributes
        );
    }
}