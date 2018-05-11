<?php
/**
 * Created by PhpStorm.
 * User: ros
 * Date: 03-05-2018
 * Time: 19:53
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Country;

class CountryController extends Controller
{
    public function getCities(Request $request, $country_id) {
        $country = Country::findOrFail($country_id);

        return $country->getAllCities();
    }
}