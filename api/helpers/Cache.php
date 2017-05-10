<?php

namespace app\helpers;

class Cache
{
    /**
     * simple caching method.
     *
     * @param  array         $key:       an unique key for this value
     * @param  \Closure      $generate:  a function that return the needed value, if it is not cached
     * @param  $exp: duration
     * @param  Dependency    $dependency dependency of the cached item. If the dependency changes,
     *                                   the corresponding value in the cache will be invalidated
     *                                   when it is fetched.
     * @return the value
     */
    public static function func($key, $generate, $exp = 0, $dep = null)
    {
        $key[] = \Yii::$app->params['code'];
        $cache =  \Yii::$app->cache;
        $value = $cache->get($key);
        if ($value === false) {
            $value = $generate();
            $cache->set($key, $value, $exp, $dep);
        }
        return $value;
    }

    public static function delete($key)
    {
        $key[] = \Yii::$app->params['code'];
        \Yii::$app->cache->delete($key);
    }
}
