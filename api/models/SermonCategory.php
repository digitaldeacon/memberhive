<?php

namespace app\models;

/**
 * Class SermonCategory
 *
 * @package app\models
 */
class SermonCategory extends \yii\db\ActiveRecord
{
    public static function tableName()
    {
        return 'sermon_category';
    }

    public function rules()
    {
        return [
            [['name', 'code'], 'required'],
        ];
    }
}
