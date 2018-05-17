<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Country;

class Review extends Model
{
    protected $table = 'reviews';
    public $timestamps = false;

    public function getAuctionWinner() {
        return DB::table('users')
            ->join('won_auctions', 'users.id', '=', 'won_auctions.winner_id')
            ->join('auctions', 'won_auctions.id', '=', 'auctions.id')
            ->where('auctions.id', '=', $this->id)
            ->value('username');
    }

}
