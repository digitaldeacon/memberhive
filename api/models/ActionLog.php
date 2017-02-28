<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "actionlog".
 *
 * @property int $id
 * @property string $context
 * @property int $refId
 * @property string $type
 * @property string $diff
 * @property int $refUserId
 * @property int $created_at
 * @property int $updated_at
 */
class ActionLog extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'actionlog';
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
            [['refId', 'created_at', 'updated_at'], 'integer'],
            [['diff','refUser'], 'string'],
            [['context', 'type'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'context' => 'Context',
            'refId' => 'Ref ID',
            'type' => 'Type',
            'diff' => 'Diff',
            'refUser' => 'Ref User Name',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    public static function log($context,
                               $refId,
                               $insert,
                               $changedAttributes)
    {
        $log = new ActionLog();
        $log->context = $context;
        $log->refId = $refId;
        $log->refUser = \Yii::$app->user->identity->username;
        $log->type = $insert ? 'insert' : 'update';
        $log->diff = $insert ? null : json_encode($changedAttributes);
        $log->save();
    }
}
