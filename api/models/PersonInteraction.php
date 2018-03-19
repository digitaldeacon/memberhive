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
class PersonInteraction extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'person_interaction';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['person_id', 'interaction_id'], 'required'],
            [['person_id', 'interaction_id', 'completedBy', 'delegatedBy'], 'integer'],
            [['doneOn', 'completedOn', 'delegatedOn'], 'safe'],
            [['response'], 'string', 'max' => 255],
            [['interaction_id'], 'exist', 'skipOnError' => true,
                'targetClass' => Interaction::class,
                'targetAttribute' => ['interaction_id' => 'id']],
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
        return [
            'person_id' => 'Person ID',
            'interaction_id' => 'Interaction ID',
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
    public function getInteraction()
    {
        return $this->hasOne(Interaction::class, ['id' => 'interaction_id']);
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
            Interaction::tableName(),
            $this->person->uid,
            $insert,
            $changedAttributes
        );
    }
}
