<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Country;

class City extends Model
{
    protected $table = 'cities';
    public $timestamps = false;

    public function getCountry() {
        $country = Country::where('id', '=', $this->country_id)->get();

        return count($country) != 0 ? $country[0] : null;
    }

}
