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
            [['created_at', 'updated_at'], 'integer'],
            [['diff', 'refUser'], 'string'],
            [['context', 'type'], 'string', 'max' => 255],
            [['refId'], 'string', 'max' => 36]
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

    public function toResponseArray()
    {
        return [
            'id' => $this->id,
            'context' => $this->context,
            'refId' => $this->refId,
            'refUser' => $this->refUser,
            'type' => $this->type,
            'diff' => $this->diff,
            'createdAt' => date('c', $this->created_at),
            'updatedAt' => date('c', $this->updated_at),
        ];
    }

    public static function log($context, $refId, $insert, $changedAttributes)
    {
        // when updates changes nothing then return
        if (!$insert && empty($changedAttributes)) {
            return;
        }
        // skip if call comes from CLI
        if (is_a(Yii::$app, 'yii\console\Application')) {
            return;
        }

        $log = new ActionLog();
        $log->context = $context;
        $log->refId = $refId;
        $log->refUser = \Yii::$app->user->identity->username;
        $log->type = $insert ? 'insert' : 'update';
        $log->diff = $insert ? null : json_encode($changedAttributes);
        if (!$log->save()) {
            throw new \yii\web\BadRequestHttpException(json_encode($log->errors));
        }
    }
}
