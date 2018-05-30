<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    use Notifiable;

    protected $guarded = [];

    // Don't add create and update timestamps in database.
    public $timestamps  = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password', 'first_name', 'last_name', 'zip_code', 'address', 'location'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function isAuctionOwner($auction) {
        $currUserID = Auth::id();
        $auctionOwnerID = $auction->owner_id;
        return $currUserID == $auctionOwnerID;
    }

    public function isProfileOwner($user) {
        $currUserID = Auth::id();
        $userID = $user->id;
        return $currUserID == $userID;
    }

    public function checkPassword($password) {
        return Hash::check($password, $this->password);
    }

    public function isAdmin() {
        if($this->is_administrator === NULL)
            return false;
        return $this->is_administrator;
    }

    public function isUserAdmin($user) {
        return $user->is_administrator;
    }

    public function isBanned() {
        $userID = $this->id;
        $bans = DB::table('bans')->where([
            ['banned_id', '=', $userID],
            ['ban_expiration_date', '>=', 'now()'],
            ['ban_start_date', '<', 'now()']
        ])->get();
        $isBanned = count($bans) != 0;
        return $isBanned; //TODO
    }

    public function isUserBanned($user) {
        $userID = $user->id;
        $bans = DB::table('bans')->where([
            ['banned_id', '=', $userID],
            ['ban_expiration_date', '>=', 'now()'],
            ['ban_start_date', '<', 'now()']
        ])->get();
        $isBanned = count($bans) != 0;
        return $isBanned;
    }

    public function isRegular() {
        return ! $this->isAdmin() && ! $this->isBanned();
    }

    public function getCity() {
        $city = City::where('id', '=', $this->location)->get();

        return count($city) != 0 ? $city[0] : null;
    }

    public function getCountry() {
        $city = $this->getCity();
        if($city == null)
            return null;

        return $city->getCountry();
    }

    public function getCountryID() {
        return $this->getCity()->country_id;
    }

    public function getCountryName() {
        $countryID = $this->getCountryID();
        return Country::select('id', 'country')->where('id', '=', $countryID)->value('country');
    }

    public function getItemsForSale() {
        return Auction::where('owner_id', '=', $this->id)->get();
    }

    public function getWishlist() {
        return Auction::join('wishlists', 'auctions.id', '=', 'wishlists.auction_id')
            ->where('wishlists.id', '=', $this->id)
            ->get();
    }

    public function getBiddingItems() {
        return Auction::join('bids', 'auctions.id', '=', 'bids.id')
            ->where('bids.bidder_id', '=', $this->id)
            ->get();
    }

    public function getPurchaseHistory() {
        return Auction::join('won_auctions', 'auctions.id', '=', 'won_auctions.id')
            ->where('won_auctions.winner_id', '=', $this->id)
            ->get();
    }

    public function getFeedback() {
        return DB::table('reviews')
            ->join('auctions', 'reviews.id', '=', 'auctions.id')
            ->where('auctions.owner_id', '=', $this->id)
            ->get();
    }

    public function getProfilePictureURL() {

        return $this->getProfilePictureURL($this->id);
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

    public function itemOnWishlist($auction) {
        $isOnList = DB::table('wishlists')->where('id', '=', $this->id)->where('auction_id', '=', $auction->id)->count();
        if($isOnList > 0)
            return true;
        else
            return false;
    }

    public function isHighestBidder($auction){
        $current_bid = $auction->current_price;
        $user_bid = DB::table('bids')
            ->where('id', '=', $auction->id)
            ->where('bidder_id', '=', $this->id)
            ->value('bid_amount');
        if($current_bid == $user_bid){
            return true;
        }
        return false;
    }

    public function verifyUser()
    {
        return $this->hasOne('App\VerifyUser');
    }
}
