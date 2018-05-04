<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchema extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Eloquent::unguard();

        $path = 'SQL_Files/database.sql';
        DB::unprepared(file_get_contents($path));

        $path = 'SQL_Files/indexes.sql';
        DB::unprepared(file_get_contents($path));

        $path = 'SQL_Files/triggers.sql';
        DB::unprepared(file_get_contents($path));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
