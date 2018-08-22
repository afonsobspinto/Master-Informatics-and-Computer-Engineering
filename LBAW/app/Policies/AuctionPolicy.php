<?php

namespace App\Policies;

use App\User;
use App\Auction;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\DB;

class AuctionPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function delete(User $user, Auction $auction) {
        $isOwner = $user->isAuctionOwner($auction);
        $auctionID = $auction->id;
        $noBids = DB::table('bids')->where('id', '=', $auctionID)->doesntExist();
        $noQAs = DB::table('qas')->where('id', '=', $auctionID)->doesntExist();
        return $isOwner && $noBids && $noQAs;
    }
}
