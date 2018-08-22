<?php
/**
 * Created by PhpStorm.
 * User: ros
 * Date: 05-05-2018
 * Time: 2:11
 */

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use App\Mail\Administration;
use Illuminate\Support\Facades\Mail;
use App\VerifyUser;

trait UserTraits
{
    use VerifyEmail;

    protected function buildUsernameRule() {
        $rulesArr = func_get_args();
        return array_merge([ 'required', 'string', 'max:255' ], $rulesArr);
    }

    protected function buildEmailRule() {
        $rulesArr = func_get_args();
        return array_merge([ 'required' , 'string', 'email', 'max:255',
//            $this->buildCheckEmailRule()
        ], $rulesArr);
    }
    protected function buildPasswordRule() {
        $rulesArr = func_get_args();
        return array_merge([ 'required', 'string', 'min:6', 'max:255' ], $rulesArr);
    }

    protected function buildCheckedPasswordRule() {
        return $this->buildPasswordRule(
            function($attribute, $value, $fail) {
                if (! Auth::user()->checkPassword($value))
                    return $fail('Wrong password.');
            });
    }

    protected function buildCheckEmailRule() {
        return
            function($attribute, $value, $fail) {

                if (! $this->checkEmail($value))
                    return $fail('Email doesn\'t exist');
            };
    }

    protected $zip_code_regex = '^[\da-zA-Z]+([ -][\da-zA-Z]+)?$'; //regex based on https://en.wikipedia.org/wiki/List_of_postal_codes
    protected function getZipCodeRule() {
        return 'required|string|regex:/' . $this->zip_code_regex . '/';
    }

    protected function createVerifyUser($userId) {
        $verifyUser = VerifyUser::create([
            'user_id' => $userId,
            'token' => str_random(40)
        ]);

        return $verifyUser;
    }

    protected $name_rule = "required|string";
    protected $address_rule = "required|string";
    protected $id_rule = 'required|integer';
}