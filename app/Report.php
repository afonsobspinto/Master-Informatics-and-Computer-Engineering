<?php

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Report extends Model
{
    protected $table = 'reports';
    public $timestamps = false;
    protected $fillable = ['id'];

    public static function create(array $data)
    {
        DB::table('reports')->insert(
            $data
        );
    }

    public static function getReports(){

        $reports = DB::table('reports')
            ->join('messages', 'messages.id', '=', 'reports.id')
            ->select('reports.*', 'messages.*')
            ->orderByRaw('send_date DESC')
            ->paginate(4);

          return $reports;
    }

}