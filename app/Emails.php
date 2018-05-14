<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Emails extends Model
{
    protected $table = 'emails';
    public $timestamps = false;
    protected $fillable = ['id','has_been_opened', 'receiver_id', 'sender_id'];

    public static function create(array $data) {
        DB::table('emails')->insert(
            $data
        );
    }
}
