<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "note_type".
 *
 * @property int $id
 * @property string $type
 * @property string $iconString
 */
class NoteType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'note_type';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['type', 'iconString'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'type' => 'Type',
            'iconString' => 'Icon String',
        ];
    }

    public function toResponseArray()
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'iconString' => $this->iconString
        ];
    }
}
