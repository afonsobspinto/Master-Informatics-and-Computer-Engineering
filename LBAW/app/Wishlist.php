<?php
/**
 * Created by IntelliJ IDEA.
 * User: cristiana
 * Date: 03-05-2018
 * Time: 9:19
 */

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Wishlist extends  Model
{
    protected $table = 'wishlists';
    public $timestamps = false;

    public static function create(array $wishlist) {
        DB::table('wishlists')->insert(
            $wishlist
        );
    }

}