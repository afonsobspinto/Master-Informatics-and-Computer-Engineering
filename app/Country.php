<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\City;

class Country extends Model
{
    protected $table = 'countries';
    public $timestamps = false;

    public function getAllCities() {
        $countryID = $this->id;
        return City::select('id', 'city')->where('country_id', '=', $countryID)->orderBy('city')->get();
    }

    public static function allOrderedCountries() {
        return Country::orderBy('country')->get();
    }
}
