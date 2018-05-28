<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Bid extends Model
{
    protected $table = 'bids';
    public $timestamps = false;

    public static function create(array $data) {
        DB::table('bids')->insert(
            $data
        );
    }

    public static function isBidBigger($bid, $auctionID){
        $auction = Auction::findOrFail($auctionID);
        if($bid < $auction->current_price)
            return false;
        return true;
    }

}
