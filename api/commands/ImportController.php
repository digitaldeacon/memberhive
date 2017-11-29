<?php
namespace app\commands;

use app\models\Family;
use app\models\Import;
use app\models\Person;
use app\models\PersonFamily;
use yii\console\Controller;
use Elvanto_API;

class ImportController extends Controller
{
    private $_verb = 'updated';

    //Set the API Key as part of the call: e.g. yii import/elvanto-persons pOO7Pk....
    public function actionElvantoPeople($api)
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
            $person = Person::findOne(
                [
                'firstName'=>$item->firstname,
                'lastName'=>$item->lastname]
            );

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
            $person->maritalStatus = $item->marital_status;
            $person->phoneHome = $item->phone;
            $person->phoneMobile = $item->mobile;

            // addresses
            $person->address = json_encode(
                [
                'home' => [
                    'street' => $item->home_address,
                    'zip' => $item->home_postcode,
                    'city' => $item->home_city,
                    'geocode' => $this->getGeoCode($item->home_address, $item->home_postcode, $item->home_city)
                    ]
                ]
            );

            //family

            if (!$person->save()) {
                var_dump($person->getErrors());
                return 1;
            }
            //$this->logImport('elvanto', $item->id, $person);
        }
        echo "Successfully inserted $inserted and updated $updated Persons\n";

        $this->setFamilies($authDetails);
        return 0;
    }

    private function getGeoCode($home_address, $home_postcode, $home_city)
    {
        $address = "$home_address, $home_postcode $home_city";
        $prepAddr = str_replace(' ', '+', $address);
        $prepAddr = urlencode($prepAddr);
        $maps = "https://maps.google.com/maps/api/geocode/json?address={$prepAddr}";
        $maps .= '&sensor=false&key=AIzaSyDT14mzMDZMtIwMXa1zNUOxqVYYylPvLIo';

        $geocode = file_get_contents($maps);
        $output = json_decode($geocode, true);
        if ($output['status'] == 'OK') {
            $latitude = $output['results'][0]['geometry']['location']['lat'];
            $longitude = $output['results'][0]['geometry']['location']['lng'];
            return [
                'lat' => $latitude,
                'lng' => $longitude
            ];
        }
        return [];
    }

    private function setFamilies($authDetails)
    {
        $elvanto = new Elvanto_API($authDetails);

        // see https://www.elvanto.com/api/people-fields/, Optional Fields
        $extraFields = [
            'family'
        ];

        $results = $elvanto->call('people/getAll', ['fields'=>$extraFields]);
        $families = [];
        foreach ($results->people->person as $item) {
            if (!empty($item->family)) {
                $id = $item->family->family_id;
                $fname = '';
                $families[$id] = [
                    'name' => '',
                    'adr' => '',
                    'members' => []
                ];
                foreach ($item->family->family_member as $member) {
                    $person = Person::findOne(['firstName'=>$member->firstname,'lastName'=>$member->lastname]);
                    if ($member->relationship == 'Primary Contact') {
                        $fname = $member->lastname . ' (' . $member->firstname . ')';
                        $families[$id]['name'] = $fname;
                        $families[$id]['adr'] = trim($person->address);
                    }
                    if (!empty($person)) {
                        $fmember = [
                            'id' =>$person->id,
                            'role' => $this->setRole($member->relationship, $person)
                        ];
                        array_push($families[$id]['members'], $fmember);
                    }
                }
            }
        }

        foreach ($families as $family) {
            $fam = Family::findOne(['name'=>$family['name']]);
            if (!$fam) {
                $fam = new Family(['name'=>$family['name']]);
                $fam->save();
            }
            if (!empty($family['members'])) {
                foreach($family['members'] as $fmember) {
                    $person = Person::findOne(intval($fmember['id']));
                    if (!empty($person)) {
                        $pfam = new PersonFamily([
                            'person_id'=>$person->id,
                            'family_id'=>$fam->id
                        ]);
                        $pfam->role = $fmember['role'];
                        $pfam->is_primary = $family['adr'] == trim($person->address);
                        if(!$pfam->save()) {
                            echo json_encode($pfam->getErrors());
                        } else {
                            var_dump( 'Added '.$person->fullName.' to family '.$family['name']
                                .' with role '.$fmember['role']. ' ('.$pfam->is_primary.')');
                        }
                    }
                }
            }
        }
    }

    private function isRolePrimary($role, $person) {

    }

    private function setRole($role, $person)
    {
        $res = 'child';
        switch($role) {
            // since differentiate between husband/wife and inlaw a manual adjustment is needed
            case 'Spouse':
            case 'Primary Contact':
                $res = $person->gender == 'm' ? 'husband' : 'wife';
                break;
            case 'Sibling':
                $res = $person->gender == 'm' ? 'brother' : 'sister';
                break;
            case 'Grandfather':
                $res = 'grandfather';
                break;
            case 'Grandmother':
                $res = 'grandmother';
                break;
            default:
                $res = 'child';
        }
        return $res;
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
