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
        return url('/images/placeholder.png');
//        TODO
    }
}
