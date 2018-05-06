<?php

namespace App;

use App\Http\Controllers\ImageFileTraits;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use File;

class Auction extends Model
{
    use ImageFileTraits;

    protected $table = 'auctions';
    public $timestamps = false;


    public function numBids() {
        return DB::table('bids')->where('id', '=', $this->id)->count();
    }

    public function getDisplayPictureURL() {

        return $this->getAuctionPicturesURLs($this->id)[0];
    }

    public function getImagesURLs() {
        return $this->getAuctionPicturesURLs($this->id);
    }

    public function getNumImages() {
        return sizeof($this->getImagesURLs());
    }

    public function currentPriceEuros() {
        if($this->current_price == null)
            return $this->starting_price;
        else
            return ($this->starting_price > $this->current_price) ? $this->starting_price : $this->current_price;
    }

    public function getTimeLeftString() {
        $endDate = new Carbon($this->end_date);
        return $endDate->diffForHumans(Carbon::now(), true);
    }

    public function getSubmittedTimeString() {
        $pubDate = new Carbon($this->publication_date);
        return Carbon::now()->diffForHumans($pubDate, true);
    }

    public static function getOpenAuctionsCollection() {
        return Auction::leftJoin('closed_auctions', 'auctions.id', '=', 'closed_auctions.id')
            ->where('closed_auctions.id', '=', null)->where('end_date', '>', 'now()')->select('*', 'auctions.id as id');
    }

    public static function create(array $data) {
        DB::table('auctions')->insert(
            $data
        );
    }
}
