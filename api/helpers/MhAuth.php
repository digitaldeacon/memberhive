<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\helpers;

/**
 * HttpBearerAuth is an action filter that supports the authentication method based on HTTP Bearer token.
 *
 * You may use HttpBearerAuth by attaching it as a behavior to a controller or module, like the following:
 *
 * ```php
 * public function behaviors()
 * {
 *     return [
 *         'bearerAuth' => [
 *             'class' => \yii\filters\auth\HttpBearerAuth::class,
 *         ],
 *     ];
 * }
 * ```
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since  2.0
 */
class MhAuth extends \yii\filters\auth\AuthMethod
{
    /**
     * @var string the HTTP authentication realm
     */
    public $realm = 'api';

    /**
     * @inheritdoc
     */
    public function authenticate($user, $request, $response)
    {
        if (\Yii::$app->getRequest()->getMethod() == 'OPTIONS') {
            \Yii::$app->getResponse()->setStatusCode(200);
            \Yii::$app->getResponse()->send();
            die();
        }

        $authHeader = $request->getHeaders()->get('Authorization');
        if ($authHeader == null && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])
            && $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] != '') {
            $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
        }

        if ($authHeader !== null && preg_match('/^Bearer\s+(.*?)$/', $authHeader, $matches)) {
            $identity = $user->loginByAccessToken($matches[1], get_class($this));
            if ($identity === null) {
                $this->handleFailure($response);
            }
            return $identity;
        }

        return null;
    }

    /**
     * @inheritdoc
     */
    public function challenge($response)
    {
        $response->getHeaders()->set('WWW-Authenticate', "Bearer realm=\"{$this->realm}\"");
    }
}
