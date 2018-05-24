<?php

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Report extends Model
{
    protected $table = 'reports';
    public $timestamps = false;
    protected $fillable = ['id', 'user_id','reported_user','auction_id', 'is_user'];

    public static function create(array $data)
    {
        DB::table('reports')->insert(
            $data
        );
    }

    public static function getReportsJoinIsUser() {

        $message =  DB::table('reports')
            ->join('messages', 'messages.id', '=', 'reports.id')
            ->join('users', 'users.id', '=', 'reports.user_id')
            ->select('reports.*', 'messages.*', 'users.*')
            ->orderByRaw('messages.send_date DESC')
            ->paginate(5);

        return $message;
    }

}