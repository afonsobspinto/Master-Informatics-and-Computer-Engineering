<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('countries', function (Blueprint $table) {
            $table->increments('id');
            $table->string('country')->nullable();
        });

        Schema::create('cities', function (Blueprint $table) {
            $table->increments('id');
            $table->string('city');
            $table->integer('country_id')->unsigned();
        });
        Schema::table('cities', function($table) {
            $table->foreign('country_id')->references('id')->on('countries');
        });

        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('zip_code')->nullable();
            $table->string('address')->nullable();
            $table->timestamp('registration_date')->useCurrent()->nullable();
            $table->integer('location')->unsigned()->nullable();
            $table->float('rating', 2, 1)->nullable();
            $table->boolean('is_administrator')->default(false)->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::table('users', function($table) {
            $table->foreign('location')->references('id')->on('cities')->onDelete('cascade');
        });

        DB::statement('ALTER TABLE users ADD CONSTRAINT chk_rating_l CHECK (rating <= 5);');
        DB::statement('ALTER TABLE users ADD CONSTRAINT chk_rating_b CHECK (rating >= 1);');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
