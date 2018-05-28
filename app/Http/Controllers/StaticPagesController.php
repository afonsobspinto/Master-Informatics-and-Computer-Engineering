<?php

namespace App\Http\Controllers;


use App\Auction;

use App\Category;
use App\Mail\Administration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Mail;


class StaticPagesController extends Controller
{

    const NUM_CAROUSEL_ITEMS = 3;
    const NUM_CARDS = 6;
    public function showLandingPage(Request $request) {

        $displayAuctions = Auction::getOpenAuctionsCollection()->inRandomOrder()->take(self::NUM_CAROUSEL_ITEMS)->get();

        $recentAuctions = Auction::getOpenAuctionsCollection()->orderBy('publication_date', 'desc')->take(self::NUM_CARDS)->get();
        $endingSoonAuctions = Auction::getOpenAuctionsCollection()->orderBy('end_date', 'asc')->take(self::NUM_CARDS)->get();

        $categories = Category::all();

        return view('pages.landingPage', [
                'displayAuctions' => $displayAuctions,
                'recentAuctions' => $recentAuctions,
                'endingSoonAuctions' => $endingSoonAuctions,
                'categories' => $categories,
            ]);
    }

    public function showAbout(Request $request) {

        $categories = Category::all();

        return view('pages.about', [
            'categories' => $categories,
        ]);
    }

    public function showFAQ(Request $request) {

        Mail::to('liandtow@gmail.com')->send(new Administration());
//        Auth::user()

        $categories = Category::all();

        return view('pages.faq', [
            'categories' => $categories,
        ]);
    }

}
