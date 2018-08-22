<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ClosedAuction extends Model
{
    protected $table = 'closed_auctions';
    public $timestamps = false;
    protected $fillable = ['id'];

    public static function create(array $data) {
        DB::table('closed_auctions')->insert(
            $data
        );
    }

}
