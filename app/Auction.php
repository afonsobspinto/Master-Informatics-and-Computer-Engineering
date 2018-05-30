<?php

namespace App;

use App\Http\Controllers\ImageFileTraits;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use File;
use Auth;

class Auction extends Model
{
    use ImageFileTraits;

    protected $table = 'auctions';
    public $timestamps = false;


    public function numBids()
    {
        return DB::table('bids')->where('id', '=', $this->id)->count();
    }

    public function getDisplayPictureURL($id)
    {

        return $this->getAuctionPicturesURLs($id)[0];
    }

    public function getImagesURLs()
    {
        return $this->getAuctionPicturesURLs($this->id);
    }

    public function getNumImages()
    {
        return sizeof($this->getImagesURLs());
    }

    public function currentPriceEuros()
    {
        if ($this->current_price == null)
            return $this->starting_price;
        else
            return ($this->starting_price > $this->current_price) ? $this->starting_price : $this->current_price;
    }

    public function getTimeLeftString()
    {
        $endDate = new Carbon($this->end_date, 'Europe/London');
        return Carbon::now('Europe/London')->diffForHumans($endDate, true);

    }

    public function getTimeLeftSeconds()
    {
        $endDate = new Carbon($this->end_date, 'Europe/London');
        return Carbon::now('Europe/London')->diffInRealSeconds($endDate, true);
    }

    public function getSubmittedTimeString()
    {

        $pubDate = new Carbon($this->publication_date);
        return Carbon::now('America/Vancouver')->diffForHumans($pubDate, true);
    }

    public static function getOpenAuctionsCollection()
    {
        return Auction::leftJoin('closed_auctions', 'auctions.id', '=', 'closed_auctions.id')
            ->where('closed_auctions.id', '=', null)->where('end_date', '>', 'now()')->select('*', 'auctions.id as id');
    }

    public static function getAuctionsToClose()
    {

        return Auction::leftJoin('closed_auctions', 'auctions.id', '=', 'closed_auctions.id')
            ->where('closed_auctions.id', '=', null)->where('end_date', '<=', 'now()')->select('*', 'auctions.id as id')->get();
    }

    public static function create(array $data)
    {
        DB::table('auctions')->insert(
            $data
        );
    }

    public function getAuctionOwner()
    {
        $userID = $this->owner_id;
        return User::select('id', 'username')->where('id', '=', $userID)->value('username');
    }

    public function getAuctionOwnerRating()
    {
        $userID = $this->owner_id;
        return User::select('id', 'rating')->where('id', '=', $userID)->value('rating');
    }

    public function getAuctionOwnerEmail()
    {
        $userID = $this->owner_id;
        return User::select('id', 'email')->where('id', '=', $userID)->value('email');
    }

    public static function getAuctionGivenID($auctionId)
    {
        return DB::table('auctions')->where('id', '=', $auctionId)->get();
    }

    public function getCityName()
    {
        $cityID = $this->city_id;
        return City::select('id', 'city')->where('id', '=', $cityID)->value('city');
    }

    public function getUserPicture($userID)
    {
        return $this->getProfilePictureURL($userID);
    }

    public function getCategoryName()
    {
        $categoryID = $this->category_id;
        return Category::select('id', 'name')->where('id', '=', $categoryID)->value('name');
    }

    public function getQAs()
    {
        return DB::table('qas')
            ->where('qas.auction_id', '=', $this->id)
            ->get();
    }

    public function getAuctionOwnerReviews()
    {
        $ownerID = $this->owner_id;
        return DB::table('reviews')
            ->join('auctions', 'reviews.id', '=', 'auctions.id')
            ->where('auctions.owner_id', '=', $ownerID)
            ->get();
    }

    public function getAuctionWinner($reviewID)
    {
        return DB::table('users')
            ->join('won_auctions', 'users.id', '=', 'won_auctions.winner_id')
            ->join('auctions', 'won_auctions.id', '=', 'auctions.id')
            ->where('auctions.id', '=', $reviewID)
            ->value('users.id');
    }

    public static function getAuctionWinnerGivenID($auctionID)
    {
        $auctionBids = DB::table('bids')->where('id', '=', $auctionID)->get();
        if (count($auctionBids) > 0) {
            $maxBid = DB::table('bids')->where('id', '=', $auctionID)->max('bid_amount');
            return DB::table('bids')->where('id', '=', $auctionID)->where('bid_amount', '=', $maxBid)->value('bidder_id');
        }
        return null;
    }

    public function getAuctionWinnerName($reviewID)
    {
        return DB::table('users')
            ->join('won_auctions', 'users.id', '=', 'won_auctions.winner_id')
            ->join('auctions', 'won_auctions.id', '=', 'auctions.id')
            ->where('auctions.id', '=', $reviewID)
            ->value('username');
    }


    public function getBids()
    {
        return DB::table('wishlists')->get();
    }

    public function deleteBids($user)
    {
        $current_bid = $this->current_price;
        DB::table('bids')
            ->where('id', '=', $this->id)
            ->where('bidder_id', '=', $user->id)
            ->where('bid_amount', '<', $current_bid)
            ->delete();
    }

    public function answerQA($auction, $qa_id, $answer)
    {
        if (Auth::user()->id == $auction->owner_id) {
            DB::table('qas')
                ->where('id', '=', $qa_id)
                ->where('auction_id', '=', $auction->id)
                ->update(['answer' => $answer]);
        }
    }

    public function removeWishlist($user)
    {
        DB::table('wishlists')
            ->where('auction_id', '=', $this->id)
            ->where('id', '=', $user->id)
            ->delete();
    }

    public function isClosed()
    {
        $closedAuction = DB::table('closed_auctions')->where('id', '=', $this->id)->get();
        if (count($closedAuction) > 0) {
            return true;
        }
        return false;
    }

    public function isWon()
    {

        $wonAuction = DB::table('won_auctions')->where('id', '=', $this->id)->get();
        if (count($wonAuction) > 0) {
            return true;
        }
        return false;
    }
}
