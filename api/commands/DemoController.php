<?php
namespace app\commands;
use app\models\Person;
use yii\console\Controller;
use app\helpers\Curl;
class DemoController extends Controller
{

    public function actionCreatePersons()
    {
        Person::deleteAll();
        $curl = new Curl();
        $resp = $curl->get('https://randomuser.me/api/', ['nat' => 'de', 'results' => 50]);
        $data = json_decode($resp);

        foreach($data->results as $item) {
            print_r($item);
            $person = new Person();
            $person->firstName = ucfirst($item->name->first);
            $person->lastName = ucfirst($item->name->last);
            if($item->gender == 'male') {
                $person->gender = 'm';
            } else {
                $person->gender = 'f';
            }
            $person->avatarUrlSmall = $item->picture->thumbnail;
            $person->avatarUrlMedium = $item->picture->medium;
            $person->avatarUrlBig = $item->picture->large;
            $person->save();
        }

    }



}
