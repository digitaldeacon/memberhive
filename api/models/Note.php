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
            \yii\behaviors\TimestampBehavior::className(),
            [
                'class' => \aracoool\uuid\UuidBehavior::class,
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
            [['text','ownerId','typeId','authorId'], 'required'],
            [['text'], 'string'],
            [['typeId', 'isPrivate'], 'integer'],
            [['created_at', 'updated_at', 'dueOn'], 'safe'],
            [['ownerId', 'authorId'], 'string', 'max' => 36],
            ['uid', '\aracoool\uuid\UuidValidator']
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
            'authorId' => 'Author ID', // who created this
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

    public function getAuthor()
    {
        return $this->hasOne(Person::className(), ['uid' => 'authorId']);
    }

    public function getRecipients()
    {
        return $this->hasMany(Person::className(), ['id' => 'person_id'])
            ->viaTable('person_note', ['note_id' => 'id']);
    }

    public function getPersonNote()
    {
        return $this->hasOne(PersonNote::className(), ['note_id' => 'id']);
    }

    public function toResponseArray($noMarkup = true)
    {
        $recipients = [];
        foreach ($this->recipients as $recipient) {
            $recipients[] = $recipient->uid;
        }

        return [
            'id' => $this->id,
            'uid' => $this->uid,
            'text' => $noMarkup ? strip_tags($this->text) : $this->text,
            'actions' => [
                'doneOn' => isset($this->personNote) ? $this->personNote->doneOn : null,
                'completedOn' => isset($this->personNote) ? $this->personNote->completedOn : null,
                'completedBy' => isset($this->personNote) ? $this->personNote->completedBy : '',
                'response' => isset($this->personNote) ? $this->personNote->response : '',
                'delegatedBy' => isset($this->personNote) ? $this->personNote->delegatedBy : '',
                'delegatedOn' => isset($this->personNote) ? $this->personNote->delegatedOn : null
            ],
            'author' => [
                'id' => $this->authorId,
                'name' => isset($this->author) ? $this->author->fullName : '',
                'avatar' => isset($this->author->avatar) ? $this->author->avatar : ''
            ],
            'ownerId' => $this->ownerId,
            'type' => $this->type->type,
            'typeId' => $this->typeId,
            'icon' => $this->type->iconString,
            'dueOn' => $this->dueOn,
            'isPrivate' => $this->isPrivate,
            'recipients' => $recipients,
            'createdAt' => date('Y-M-d H:i', $this->created_at),
            'updatedAt' => date('Y-M-d H:i', $this->updated_at),
        ];
    }
}
