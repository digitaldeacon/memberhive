<?php
namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

use app\enums\UserRole;

class User extends ActiveRecord implements IdentityInterface
{
    use \app\helpers\UserTrait;

    /*protected static function getSecretKey()
    {
        $token = '';
        if (file_exists('../.ssh/jwtRS256.key')) {
            $token = file_get_contents('../.ssh/jwtRS256.key');
        }
        return $token;
    }

    protected static function getPublicKey()
    {
        $token = '';
        if (file_exists('../.ssh/jwtRS256.key.pub')) {
            $token = file_get_contents('../.ssh/jwtRS256.key.pub');
        }
        return $token;
    }*/

    public function init()
    {
        parent::init();
        \Yii::$app->user->enableSession = false;
    }

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
            [['id','personId'], 'integer'],
            [['username'], 'required'],
            [['password'], 'string', 'min' => 6],
            ['username', 'unique'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => t('ID'),
        ];
    }

    public function toResponseArray()
    {
        return [
            'token' => $this->getJWT(),
            'personId' => isset($this->person) ? $this->person->uid : '',
            'expiresAt' => $this->getJwtExpirationDate(),
            'role' => $this->role
        ];
    }

    public function getPerson()
    {
        return $this->hasOne(Person::class, ['id' => 'personId']);
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
     * @return User
     */
    /*public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['accessToken' => $token]);
    }*/

    public function getId()
    {
        return $this->id;
    }

    public function getUsername()
    {
        return $this->username;
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
        if ($password ==! '') {
            $this->passwordHash = Yii::$app->security->generatePasswordHash($password);
        }
    }

    public function setRole($role)
    {
        $auth = \Yii::$app->authManager;
        $roleObject = $auth->getRole($role);
        if (!$roleObject) {
            throw new InvalidParamException("There is no role as '$role'");
        }
        $auth->revokeAll($this->id);
        $auth->assign($roleObject, $this->id);
        $this->role = $role;
    }

    public function generateRandomPassword($length = 8)
    {
        $rpw = Yii::$app->security->generateRandomString($length);
        $this->setPassword($rpw);
    }

    public function getPassword()
    {
        return '';
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
        parent::afterSave($insert, $changedAttributes);

        $uid = !empty($this->person->uid) ? $this->person->uid : 'root';

        ActionLog::log(
            Person::tableName(),
            $uid,
            $insert,
            $changedAttributes
        );
    }
}
