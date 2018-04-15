<?php

namespace App\Http\Controllers;


use App\Auction;

use App\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class StaticPagesController extends Controller
{

    const NUM_CAROUSEL_ITEMS = 3;
    const NUM_CARDS = 6;
    public function showLandingPage(Request $request) {

        $displayAuctions = Auction::getOpenAuctionsCollection()->inRandomOrder()->take(self::NUM_CAROUSEL_ITEMS)->get();
        $recentAuctions = Auction::getOpenAuctionsCollection()->orderBy('publication_date', 'desc')->take(self::NUM_CARDS)->get();
        $endingSoonAuctions = Auction::getOpenAuctionsCollection()->orderBy('end_date', 'asc')->take(self::NUM_CARDS)->get();

        $categories = Category::all();

        return view('staticPages.landingPage', [
                'displayAuctions' => $displayAuctions,
                'recentAuctions' => $recentAuctions,
                'endingSoonAuctions' => $endingSoonAuctions,
                'categories' => $categories,
            ]);
    }

}
