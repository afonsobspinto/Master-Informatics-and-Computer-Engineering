<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class WonAuction extends Model
{
    protected $table = 'won_auctions';
    public $timestamps = false;
    protected $fillable = ['id', 'is_successful_transaction', 'has_winner_complained', 'winner_id'];

    public static function create(array $data) {
        DB::table('won_auctions')->insert(
            $data
        );
    }

}
