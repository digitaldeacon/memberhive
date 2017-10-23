<?php
namespace app\commands;

use app\models\Tag;
use app\models\Person;
use yii\console\Controller;
use app\helpers\Curl;

class DemoController extends Controller
{

    public function actionCreate($peopleCnt = 50)
    {
        Person::deleteAll(['NOT IN', 'id', [1]]);
        $curl = new Curl();
        $resp = $curl->get('https://randomuser.me/api/', ['nat' => 'de', 'results' => $peopleCnt]);
        $data = json_decode($resp);

        foreach ($data->results as $item) {
            $person = new Person();
            $person->firstName = ucfirst($item->name->first);
            $person->lastName = ucfirst($item->name->last);
            if ($item->gender == 'male') {
                $person->gender = 'm';
            } else {
                $person->gender = 'f';
            }
            $person->email = $item->email;
            $person->birthday = date('Y-m-d', strtotime($item->dob));
            $person->avatarUrlSmall = $item->picture->thumbnail;
            $person->avatarUrlMedium = $item->picture->medium;
            $person->avatarUrlBig = $item->picture->large;

            $person->setAddressEmpty();

            if (!$person->save()) {
                print_r($person->errors);
            }
        }
    }

    public function actionPlaygroundPerson($uid)
    {
        $person = Person::find()
            ->with('tags')
            ->where(['id'=>$uid])
            ->one();

        var_dump(defined('YII_ENV'));
    }

    public function actionTest()
    {
        $str = "localhost:4200";
        $str2 = "localhost";

        $res1 = explode(':', $str);
        $res2 = explode(':', $str2);

        var_dump($res1[0]);
        var_dump($res2[0]);
    }
}
