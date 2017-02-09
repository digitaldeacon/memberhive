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

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title', 'text'], 'string'],
            [['typeId', 'isPrivate'], 'integer'],
            [['createdAt', 'updatedAt'], 'safe'],
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
            'title' => 'Title',
            'text' => 'Text',
            'typeId' => 'Type ID',
            'ownerId' => 'Owner ID',
            'isPrivate' => 'Is Private',
            'createdAt' => 'Created At',
            'updatedAt' => 'Updated At',
        ];
    }
}
