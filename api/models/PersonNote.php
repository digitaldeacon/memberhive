<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "person_note".
 *
 * @property int $person_id
 * @property int $note_id
 * @property string $doneOn
 * @property int $completedBy
 * @property string $completedOn
 * @property string $response
 * @property int $delegatedBy
 * @property string $delegatedOn
 *
 * @property Note $note
 * @property Person $person
 */
class PersonNote extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'person_note';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['person_id', 'note_id'], 'required'],
            [['person_id', 'note_id', 'completedBy', 'delegatedBy'], 'integer'],
            [['doneOn', 'completedOn', 'delegatedOn'], 'safe'],
            [['response'], 'string', 'max' => 255],
            [['note_id'], 'exist', 'skipOnError' => true, 'targetClass' => Note::className(), 'targetAttribute' => ['note_id' => 'id']],
            [['person_id'], 'exist', 'skipOnError' => true, 'targetClass' => Person::className(), 'targetAttribute' => ['person_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'person_id' => 'Person ID',
            'note_id' => 'Note ID',
            'doneOn' => 'Done On',
            'completedBy' => 'Completed By',
            'completedOn' => 'Completed On',
            'response' => 'Response',
            'delegatedBy' => 'Delegated By',
            'delegatedOn' => 'Delegated On',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNote()
    {
        return $this->hasOne(Note::className(), ['id' => 'note_id']);
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
            Note::tableName(),
            $this->person->uid,
            $insert,
            $changedAttributes
        );
    }
}
