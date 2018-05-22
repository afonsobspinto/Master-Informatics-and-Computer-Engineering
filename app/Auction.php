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

    public function getAuctionOwner(){
        $userID = $this->owner_id;
        return User::select('id', 'username')->where('id', '=', $userID)->value('username');
    }

    public function getAuctionOwnerRating(){
        $userID = $this->owner_id;
        return User::select('id', 'rating')->where('id', '=', $userID)->value('rating');
    }

    public function getAuctionOwnerEmail(){
        $userID = $this->owner_id;
        return User::select('id', 'email')->where('id', '=', $userID)->value('email');
    }

    public function getCityName(){
        $cityID = $this->city_id;
        return City::select('id', 'city')->where('id', '=', $cityID)->value('city');
    }

    public function getUserPicture($userID){
        return $this->getProfilePictureURL($userID);
    }

    public function getCategoryName(){
        $categoryID = $this->category_id;
        return Category::select('id', 'name')->where('id', '=', $categoryID)->value('name');
    }

    public function getQAs() {
        return DB::table('qas')
            ->join('auctions', 'qas.id', '=', 'auctions.id')
            ->where('auctions.id', '=', $this->id)
            ->get();
    }

    public function getAuctionOwnerReviews(){
        $ownerID = $this->owner_id;
        return DB::table('reviews')
            ->join('auctions', 'reviews.id', '=', 'auctions.id')
            ->where('auctions.owner_id', '=', $ownerID)
            ->get();
    }

    public function getAuctionWinner($reviewID) {
        return DB::table('users')
            ->join('won_auctions', 'users.id', '=', 'won_auctions.winner_id')
            ->join('auctions', 'won_auctions.id', '=', 'auctions.id')
            ->where('auctions.id', '=', $reviewID)
            ->value('users.id');

    }

    public function getAuctionWinnerName($reviewID) {
        return DB::table('users')
            ->join('won_auctions', 'users.id', '=', 'won_auctions.winner_id')
            ->join('auctions', 'won_auctions.id', '=', 'auctions.id')
            ->where('auctions.id', '=', $reviewID)
            ->value('username');
    }
}
