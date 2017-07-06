<?php

namespace app\models;

use \aracoool\uuid\Uuid;
use \aracoool\uuid\UuidBehavior;

/**
 * This is the model class for table "interaction".
 *
 * @property int $id
 * @property string $title
 * @property string $text
 * @property int $typeId
 * @property string $refId
 * @property int $isPrivate
 * @property string $createdAt
 * @property string $updatedAt
 */
class Interaction extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'interaction';
    }

    public function behaviors()
    {
        return [
            \yii\behaviors\TimestampBehavior::className(),
            [
                'class' => UuidBehavior::class,
                'version' => Uuid::V4,
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
            [['text','refId','type','authorId','visibility'], 'required'],
            [['text','type','visibility','actionType'], 'string'],
            [['created_at', 'updated_at', 'dueOn'], 'safe'],
            [['refId', 'authorId'], 'string', 'max' => 36],
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
            'type' => 'Type',
            'refId' => 'Owner ID',
            'authorId' => 'Author ID', // who created this
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    public function getOwner()
    {
        return $this->hasOne(Person::className(), ['uid' => 'refId']);
    }

    public function getAuthor()
    {
        return $this->hasOne(Person::className(), ['uid' => 'authorId']);
    }

    public function getRecipients()
    {
        return $this->hasMany(Person::className(), ['id' => 'person_id'])
            ->via('personInteractions');
    }

    public function getPersonInteractions()
    {
        return $this->hasMany(PersonInteraction::className(), ['interaction_id' => 'id']);
    }

    public function toResponseArray($noMarkup = true)
    {
        $recipients = [];
        foreach ($this->recipients as $recipient) {
            $recipients[] = $recipient->uid;
        }

        $personActions = [];
        foreach ($this->personInteractions as $pi) {
            $personActions[$pi->person->uid] = [
                'doneOn' => isset($pi->doneOn) ? $pi->doneOn : null,
                'completedOn' => isset($pi->completedOn) ? $pi->completedOn : null,
                'completedBy' => isset($pi->completedBy) ? $pi->completedBy : '',
                'response' => isset($pi->response) ? $pi->response : '',
                'delegatedBy' => isset($pi->delegatedBy) ? $pi->delegatedBy : '',
                'delegatedOn' => isset($pi->delegatedOn) ? $pi->delegatedOn : null
            ];
        }

        return [
            'id' => $this->id,
            'uid' => $this->uid,
            'text' => $noMarkup ? strip_tags($this->text) : $this->text,
            'actions' => $personActions,
            'author' => [
                'id' => $this->authorId,
                'name' => isset($this->author) ? $this->author->fullName : '',
                'avatar' => isset($this->author->avatar) ? $this->author->avatar : ''
            ],
            'refId' => $this->refId,
            'type' => $this->type,
            'actionType' => $this->actionType,
            'dueOn' => $this->dueOn,
            'visibility' => $this->visibility,
            'recipients' => $recipients,
            'createdAt' => date('c', $this->created_at),
            'updatedAt' => date('c', $this->updated_at),
        ];
    }
}
