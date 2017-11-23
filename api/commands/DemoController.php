<?php
namespace app\commands;

use app\models\Family;
use app\models\Tag;
use app\models\PersonFamily;
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

    public function actionTest($id)
    {
        echo 'find person with UID: ' . $id . "\n";
        $f = Family::find()
            ->with(['personFamily' => function($q) {
                $q->andWhere(['person_id'=>17]);
            }])
            ->where(['id' => $id])
            ->one();
        $f->unrelated = '[00a87051-00b5-45b9-9c32-bd3c73b3667d]';
        $f->save();
        $pfam = $f->getPersonFamily()->one();
        $pfam->role = 'servant3';
        $pfam->save();
        var_dump($f->toResponseArray());
        var_dump(date('Y-m-d H:i:s',$f->updated_at));
        var_dump(Family::findOne($id)->toResponseArray());
    }
}
