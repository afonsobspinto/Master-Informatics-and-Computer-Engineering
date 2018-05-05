<?php
/**
 * Created by PhpStorm.
 * User: ros
 * Date: 05-05-2018
 * Time: 2:11
 */

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

trait UserTraits
{
    protected function buildUsernameRule() {
        $rulesArr = func_get_args();
        return array_merge([ 'required', 'string', 'max:255' ], $rulesArr);
    }

    protected function buildEmailRule() {
        $rulesArr = func_get_args();
        return array_merge([ 'required' , 'string', 'email', 'max:255' ], $rulesArr);
    }
    protected function buildPasswordRule() {
        $rulesArr = func_get_args();
        return array_merge([ 'required', 'string', 'min:6' ], $rulesArr);
    }

    protected function buildCheckedPasswordRule() {
        return $this->buildPasswordRule(
            function($attribute, $value, $fail) {
                if (! Auth::user()->checkPassword($value))
                    return $fail('Wrong password.');
            });
    }

    protected $zip_code_rule =  'required|string|regex:/^[\da-zA-Z]+([ -][\da-zA-Z]+)?$/'; //regex based on https://en.wikipedia.org/wiki/List_of_postal_codes

    protected $name_rule = "required|string";
    protected $address_rule = "required|string";
    protected $id_rule = 'required|integer';
}