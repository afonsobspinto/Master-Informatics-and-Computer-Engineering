<?php

namespace App\Http\Controllers;


use App\Auction;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class StaticPagesController extends Controller
{

    private function getOpenAuctions() {
        return \App\Auction::leftJoin('closed_auctions', 'auctions.id', '=', 'closed_auctions.id')
            ->where('closed_auctions.id', '=', null)->where('end_date', '>', 'now()')->select('*', 'auctions.id as id');
    }

    const NUM_CAROUSEL_ITEMS = 3;
    const NUM_CARDS = 6;
    public function showLandingPage(Request $request) {

        $displayAuctions = $this->getOpenAuctions()->inRandomOrder()->take(self::NUM_CAROUSEL_ITEMS)->get();
        $recentAuctions = $this->getOpenAuctions()->orderBy('publication_date', 'desc')->take(self::NUM_CARDS)->get();
        $endingSoonAuctions = $this->getOpenAuctions()->orderBy('end_date', 'asc')->take(self::NUM_CARDS)->get();

        return view('staticPages.landingPage', [
                'displayAuctions' => $displayAuctions,
                'recentAuctions' => $recentAuctions,
                'endingSoonAuctions' => $endingSoonAuctions,
            ]);
    }

}
