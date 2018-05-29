<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class QA extends Model
{
    protected $table = 'qas';
    public $timestamps = false;
    protected $fillable = ['question', 'answer', 'auction_id', 'questioner_id'];

    public static function create(array $data) {
        DB::table('qas')->insert(
            $data
        );
    }

}
