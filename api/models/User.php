<?php
namespace app\models;
use Yii;
use yii\base\NotSupportedException;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
/**
 * This is the model class for table "user".
 *
 * @property integer $id
 *
 * @property string $username
 * @property string $email
 * @property string $lastLogin
 * @property string $createdAt
 * @property string $updatedAt
 *
 * @property string $authKey
 * @property string $passwordHash
 * @property string $passwordResetToken
 * @property string $passwordResetExpireDate
 * @property string $accessToken
 *
 */
class User extends ActiveRecord implements IdentityInterface
{
    public static function tableName()
    {
        return 'user';
    }
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id'], 'integer'],
            [['username', 'email'], 'required'],
            [['password'], 'string', 'min' => 6],
            ['username', 'unique'],
        ];
    }
    public function attributeLabels()
    {
        return [
            'id' => t('ID'),
            'email' => t('user.email'),
        ];
    }
    /**
     * @param integer $id
     * @return User
     */
    public static function findIdentity($id)
    {
        return static::findOne($id);
    }
    /**
     * @param string $token
     * @param string $type
     * @return boolean
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['accessToken' => $token]);
    }
    public function getId()
    {
        return $this->id;
    }
    public function getAuthKey()
    {
        return $this->authKey;
    }
    public function validateAuthKey($authKey)
    {
        return $this->authKey === $authKey;
    }
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->passwordHash);
    }
    public function setPassword($password)
    {
        if($password ==! "") {
            $this->passwordHash = Yii::$app->security->generatePasswordHash($password);
        }
    }
    public function getPassword()
    {
        return "";
    }
    public function generateAuthKey()
    {
        $this->authKey = Yii::$app->security->generateRandomString();
    }
    public function generatePasswordResetToken()
    {
        $this->passwordResetToken = Yii::$app->security->generateRandomString() . '_' . time();
    }
    public static function isPasswordResetTokenValid($token)
    {
        if (empty($token)) {
            return false;
        }
        $timestamp = (int) substr($token, strrpos($token, '_') + 1);
        $expire = Yii::$app->params['user.passwordResetTokenExpire'];
        return $timestamp + $expire >= time();
    }


    public function getPermissions()
    {
        $auth = Yii::$app->authManager;
        return $auth->getPermissionsByUser($this->id);
    }
    public function can($permission)
    {
        $key = [\Yii::$app->params['code'], 'user', $this->id, $permission];
        $data = \Yii::$app->cache->get($key);
        if ($data === false) {
            $auth = Yii::$app->authManager;
            $data = $auth->checkAccess($this->id, $permission);
            \Yii::$app->cache->set($key, $data);
        }
        return $data == 1;
    }
    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert)) {
            if ($this->isNewRecord) {
                $this->accessToken = Yii::$app->security->generateRandomString();
            }
            return true;
        }
        return false;
    }
    public function afterSave($insert, $changedAttributes)
    {
        if($insert === true) {

        }
        return parent::afterSave($insert, $changedAttributes);
    }

}