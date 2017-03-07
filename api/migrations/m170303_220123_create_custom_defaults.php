<?php

use yii\db\Migration;

class m170303_220123_create_custom_defaults extends Migration
{
    public function up()
    {
        // icons are from material.io/icons
        $fields = [
            [
                'name' =>'phoneHome',
                'label' => 'Phone (Home)',
                'type' => 'tel',
                'icon' => 'phone',
                'position' => 1,
                'groupWith' => null,
                'validators' => null,
                'extraConfig' => null,
                'active' => 1
            ],
            [
                'name' =>'phoneMobile',
                'label' => 'Phone (Mobile)',
                'type' => 'tel',
                'icon' => 'phonelink_ring',
                'position' => 2,
                'groupWith' => null,
                'validators' => null,
                'extraConfig' => null,
                'active' => 1
            ],
            [
                'name' =>'addressHome',
                'label' => 'Address (Home)',
                'type' => 'address',
                'icon' => '',
                'position' => 3,
                'groupWith' => null,
                'validators' => null,
                'extraConfig' => null,
                'active' => 1
            ],
        ];

        foreach ($fields as $key => $field) {
            $newCustom = new \app\models\Custom();
            foreach ($field as $col => $val) {
                $newCustom->{$col} = $val;
            }
            $newCustom->save();
        }
    }

    public function down()
    {
        \app\models\Custom::deleteAll();
        return true;
    }
}
