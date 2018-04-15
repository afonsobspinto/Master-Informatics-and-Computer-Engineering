<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Auction extends Model
{
    protected $table = 'auctions';
    public $timestamps = false;
    protected $primaryKey = 'id';


    public function numBids() {
        return DB::table('bids')->where('id', '=', $this->id)->count();
    }

    public function getDisplayPictureURL() {

        $imagesFolder = public_path() . "/images/auctions/" . $this->id;
        $images = \File::glob($imagesFolder . "/0.*");

        if($images === false || sizeof($images) === 0)
            return url('/images/placeholder.png');
        else {
            preg_match('/images.*/', $images[0], $matches);
            $imagePath = $matches[0];
            $url = asset($imagePath);
            return $url;
        }
    }
}
