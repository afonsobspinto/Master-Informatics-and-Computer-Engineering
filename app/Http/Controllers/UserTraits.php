<?php
/**
 * Created by PhpStorm.
 * User: ros
 * Date: 05-05-2018
 * Time: 2:11
 */

namespace App\Http\Controllers;


trait UserTraits
{
    protected $zip_code_rule =  'required|string|regex:/^[\da-zA-Z]+([ -][\da-zA-Z]+)?$/'; //regex based on https://en.wikipedia.org/wiki/List_of_postal_codes

    protected $name_rule = "required|string";
    protected $address_rule = "required|string";
    protected $id_rule = 'required|integer';
    protected $password_rule = 'required|string|min:6';
}