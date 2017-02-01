<?php
namespace app\commands;

use app\models\Person;
use yii\console\Controller;
use Elvanto_API;

class ImportController extends Controller
{
    private $verb = 'updated';

    //Set the API Key as part of the call: e.g. yii import/elvanto-persons pOO7Pk....
    public function actionElvantoPersons($api)
    {
        $inserted = 0;
        $updated = 0;

        if(empty($api))
            return 1;

        $authDetails = array('api_key' => $api);
        $elvanto = new Elvanto_API($authDetails);

        // see https://www.elvanto.com/api/people-fields/, Optional Fields
        $extraFields = [
            'gender',
            'birthday',
            'anniversary',
            'marital_status',
            'family', // TODO check whether person has been created (associate), else create and associate
            'custom_f5430935-e88a-11e6-8f05-0a6b0d448233',//verantworltich
            'custom_c8b91d7b-e660-11e6-8f05-0a6b0d448233' //taufdatum
        ];

        $results = $elvanto->call('people/getAll',['fields'=>$extraFields]);
        /*$customs = $elvanto->call('people/customFields/getAll');
        var_dump($customs);
        return 0;*/

        foreach($results->people->person as $item) {
            $person = Person::findOne(['firstName'=>$item->firstname,'lastName'=>$item->lastname]);
            if(empty($person)) {
                $person = new Person();
                $inserted++;
            } else {
                $updated++;
            }

            $person->firstName = ucfirst($item->firstname);
            $person->lastName = ucfirst($item->lastname);
            $person->email = $item->email;
            if($item->gender == 'Male') {
                $person->gender = 'm';
            } else {
                $person->gender = 'f';
            }
            //$person->avatarUrlSmall = $item->picture->thumbnail;
            //$person->avatarUrlMedium = $item->picture->medium;
            $person->avatarUrlBig = $item->picture;
            $person->birthday = $item->birthday;
            $person->anniversary = $item->anniversary;
            $person->baptized = $item->{'custom_c8b91d7b-e660-11e6-8f05-0a6b0d448233'};
            $person->maritalStatus = $item->anniversary;

            if(!$person->save()) {
                var_dump($person->getErrors());
                return 1;
            }
        }
        echo "Successfully inserted $inserted and updated $updated Persons\n";
        return 0;
    }
}