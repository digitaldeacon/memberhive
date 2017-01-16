<?php

namespace app\models;
/**
 * Class Sermon
 * @package app\models
 *
 * @property string $title
 * @property string $language
 * @property string $picture
 * @property string $notes
 * @property string $filesJson
 * @property string $scripturesJson
 * @property string $date
 * @property integer $hits
 * @property integer $sermonCategoryId
 * @property SermonCategory $sermonCategory
 */
class Sermon extends \yii\db\ActiveRecord
{
    public static function tableName()
    {
        return 'sermon';
    }
    public function rules()
    {
        return [
            [['title', 'language'], 'required'],
            [['title', 'language', 'picture', 'notes'], 'string'],
            [['hits', 'sermonCategoryId'], 'integer'],
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSermonCategory()
    {
        return $this->hasOne(SermonCategory::className(), ['sermonCategoryId' => 'id']);
    }

    public function getFiles()
    {
        $data = json_decode($this->filesJson, true);
        if($data === false) return [];
        return $data;
    }
    public function setFiles($response)
    {
        $this->filesJson = json_encode($response);
    }
    public function getScriptures()
    {
        $data = json_decode($this->scripturesJson, true);
        if($data === false) return [];
        return $data;
    }
    public function setScriptures($response)
    {
        $this->scripturesJson = json_encode($response);
    }

}
