<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "import".
 *
 * @property int $id
 * @property string $type
 * @property string $refTable
 * @property int $refId
 * @property string $remoteId
 * @property int $created_at
 */
class Import extends \yii\db\ActiveRecord
{
    public function behaviors()
    {
        return [
            \yii\behaviors\TimestampBehavior::className()
        ];
    }

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'import';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['refId', 'created_at','updated_at'], 'integer'],
            [['type', 'refTable'], 'string', 'max' => 255],
            [['remoteId'], 'string', 'max' => 36],
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
            'refTable' => 'Ref Table',
            'refId' => 'Ref ID',
            'remoteId' => 'Remote ID',
            'created_at' => 'Created At',
        ];
    }
}
