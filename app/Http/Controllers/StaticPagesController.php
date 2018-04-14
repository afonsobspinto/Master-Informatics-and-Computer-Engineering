<?php

namespace App\Http\Controllers;

use App\Item;
use App\Card;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class StaticPagesController extends Controller
{


    public function showLandingPage(Request $request) {
        $openAuctions = DB::table('auctions')->leftJoin('closed_auctions', 'auctions.id', '=', 'closed_auctions.id')
            ->where('closed_auctions.id', '=', null);

        $displayAuctions = $openAuctions->inRandomOrder()->take(5)->get();

        return view('staticPages.landingPage',
            [
                'displayAuctions' => $displayAuctions,

            ]);
    }

}
