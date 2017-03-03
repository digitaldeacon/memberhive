<?php
namespace app\commands;

use app\models\Import;
use app\models\Person;
use yii\console\Controller;
use Elvanto_API;

class ImportController extends Controller
{
    private $_verb = 'updated';

    //Set the API Key as part of the call: e.g. yii import/elvanto-persons pOO7Pk....
    public function actionElvantoPersons($api)
    {
        $inserted = 0;
        $updated = 0;

        if (empty($api)) {
            return 1;
        }

        $authDetails = ['api_key' => $api];
        $elvanto = new Elvanto_API($authDetails);

        // see https://www.elvanto.com/api/people-fields/, Optional Fields
        $extraFields = [
            'gender',
            'birthday',
            'anniversary',
            'marital_status',
            'home_address',
            'home_postcode',
            'home_city',
            'family', // TODO check whether person has been created (associate), else create and associate
            'custom_f5430935-e88a-11e6-8f05-0a6b0d448233',//verantworltich
            'custom_c8b91d7b-e660-11e6-8f05-0a6b0d448233' //taufdatum
        ];

        $results = $elvanto->call('people/getAll', ['fields'=>$extraFields]);
        /*$customs = $elvanto->call('people/customFields/getAll');
        var_dump($customs);
        return 0;*/

        foreach ($results->people->person as $item) {
            $person = Person::findOne([
                'firstName'=>$item->firstname,
                'lastName'=>$item->lastname]);

            if (empty($person)) {
                $person = Person::findOne(['email'=>$item->email]);
                if (empty($person)) {
                    $person = new Person();
                    $inserted++;
                } else {
                    $updated++;
                }
            } else {
                $updated++;
            }

            $person->firstName = ucfirst($item->firstname);
            $person->lastName = ucfirst($item->lastname);
            $person->email = $item->email;
            if ($item->gender == 'Male') {
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
            $person->phoneHome = $item->phone;
            $person->phoneMobile = $item->mobile;

            // addreses
            $person->address = json_encode([
                'home' => [
                    'street' => $item->home_address,
                    'zip' => $item->home_postcode,
                    'city' => $item->home_city,
                    'geocode' => []
                    ]
            ]);

            if (!$person->save()) {
                var_dump($person->getErrors());
                return 1;
            }

            //$this->logImport('elvanto', $item->id, $person);
        }
        echo "Successfully inserted $inserted and updated $updated Persons\n";
        return 0;
    }

    private function getGeoCode($home_address, $home_postcode, $home_city)
    {
        $address = "$home_address, $home_postcode $home_city";
        $prepAddr = str_replace(' ', '+', $address);
        $geocode = file_get_contents('https://maps.google.com/maps/api/geocode/json?address=' . $prepAddr . '&sensor=false');
        $output= json_decode($geocode);
        $latitude = $output->results[0]->geometry->location->lat;
        $longitude = $output->results[0]->geometry->location->lng;
        return [
            'lat' => $latitude,
            'long' => $longitude
        ];
    }

    private function logImport($type, $remoteId, $object)
    {
        $import = new Import();
        $import->type = $type;
        $import->refTable = $object->tableName();
        $import->refId = $object->id;
        $import->remoteId = $remoteId;
        if (!$import->save()) {
            var_dump($import->getErrors());
        }
    }

    public function actionMemberhivePersons($domain, $access_token)
    {
        $url = "https://$domain.memberhive.com/api/Persons?access_token=$access_token";

        $ch = curl_init();
        // Disable SSL verification
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // Will return the response, if false it print the response
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // Set the url
        curl_setopt($ch, CURLOPT_URL, $url);
        // Execute
        $result=curl_exec($ch);
        // Closing
        curl_close($ch);

        var_dump(json_decode($result, true));
        return 0;
    }
}
