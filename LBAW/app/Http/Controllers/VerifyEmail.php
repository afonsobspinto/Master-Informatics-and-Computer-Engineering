<?php
/**
 * Created by PhpStorm.
 * User: ros
 * Date: 28-05-2018
 * Time: 21:39
 */

namespace App\Http\Controllers;

use hbattat;

trait VerifyEmail
{
    protected function checkEmail($email) {
        $adminEmail = env("MAIL_USERNAME");

        $ve = new hbattat\VerifyEmail($email, $adminEmail);

        return $ve->verify();
    }
}