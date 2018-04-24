<?php

namespace App\Policies;

use App\User;
use App\Auction;
use Illuminate\Auth\Access\HandlesAuthorization;

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
        return $user->isAuctionOwner($auction);
    }
}
