<?php
namespace app\helpers;

use Firebase\JWT\JWT;
use Yii;
use yii\web\Request as WebRequest;

trait UserTrait
{

    /**
     * Store JWT token header items.
     * @var array
     */
    protected static $decodedToken;
    private $_tokenData = [];
    private $_token = [];

    /**
     * Getter for exp that's used for generation of JWT
     * @return string secret key used to generate JWT
     */
    protected static function getJwtExpire()
    {
        return Yii::$app->params['jwt']['expire'];
    }
    /**
     * Getter for secret key that's used for generation of JWT
     * @return string secret key used to generate JWT
     */
    protected static function getSecretKey()
    {
        return Yii::$app->params['jwt']['secret'];
    }
    /**
     * Getter for secret key that's used for generation of JWT
     * @return string secret key used to generate JWT
     */
    protected static function getPublicKey()
    {
        return Yii::$app->params['jwt']['rsaPub'];
    }

    /**
     * Getter for "header" array that's used for generation of JWT
     * @return array JWT Header Token param, see http://jwt.io/ for details
     */
    protected static function getHeaderToken()
    {
        return [];
    }
    /**
     * Logins user by given JWT encoded string. If string is correctly decoded
     * - array (token) must contain 'jti' param - the id of existing user
     * @param  string $accessToken access token to decode
     * @return mixed|null          User model or null if there's no user
     * @throws \yii\web\ForbiddenHttpException if anything went wrong
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        $secret = static::getPublicKey();
        // \Yii::trace($secret);
        // Decode token and transform it into array.
        // Firebase\JWT\JWT throws exception if token can not be decoded
        try {
            $decoded = JWT::decode($token, $secret, [static::getAlgo()]);
            // \Yii::trace($decoded);
        } catch (\Exception $e) {
            \Yii::trace($e);
            return false;
        }
        static::$decodedToken = (array) $decoded;
        // If there's no jti param - exception
        if (!isset(static::$decodedToken['jti'])) {
            return false;
        }
        // JTI is unique identifier of user.
        // For more details: https://tools.ietf.org/html/rfc7519#section-4.1.7
        $id = static::$decodedToken['jti'];
        return static::findByJTI($id);
    }
    /**
     * Finds User model using static method findOne
     * Override this method in model if you need to complicate id-management
     * @param  string $id if of user to search
     * @return mixed       User model
     */
    public static function findByJTI($id)
    {
        return static::findOne($id);
    }
    /**
     * Getter for encryption algorytm used in JWT generation and decoding
     * Override this method to set up other algorytm.
     * @return string needed algorytm
     */
    public static function getAlgo()
    {
        return 'HS256';
    }
    /**
     * Returns some 'id' to encode to token. By default is current model id.
     * If you override this method, be sure that findByJTI is updated too
     * @return integer any unique integer identifier of user
     */
    public function getJTI()
    {
        return $this->getId();
    }
    /**
     * Encodes model data to create custom JWT with model.id set in it
     * @return string encoded JWT
     */
    public function getJWT()
    {
        // Collect all the data
        $secret      = static::getSecretKey();
        $currentTime = time();
        $request     = Yii::$app->request;
        $hostInfo    = '';
        // There is also a \yii\console\Request that doesn't have this property
        if ($request instanceof WebRequest) {
            $hostInfo = $request->hostInfo;
        }
        // Merge token with presets not to miss any params in custom
        // configuration
        $this->_token = array_merge([
            'iss' => $hostInfo,
            'aud' => $hostInfo,
            'iat' => $currentTime,
            'nbf' => $currentTime,
            'exp' => $currentTime + intval(Yii::$app->params['jwt']['expire']),
            'data' => $this->_tokenData
        ], static::getHeaderToken());
        // Set up id
        $this->_token['jti'] = $this->getJTI();
        return JWT::encode($this->_token, $secret, static::getAlgo());
    }

    protected function setTokenData($data)
    {
        $this->_tokenData = $data;
    }

    protected function getJwtExpirationDate()
    {
        return $this->_token['exp'];
    }
}
