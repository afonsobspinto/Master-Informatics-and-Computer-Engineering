<?php
/**
 * Created by PhpStorm.
 * User: ros
 * Date: 22-04-2018
 * Time: 18:53
 */

namespace App\Http\Controllers;

use App\Category;
use App\Auction;



use Illuminate\Http\Request;

class AuctionController extends Controller
{

    public function showAuctionPage(Request $request, $auction_id) {
        $categories = Category::all();
        $auction = Auction::findOrFail($auction_id);

        return view('pages.auction', [
            'categories' => $categories,
            'auction' => $auction
        ]);
    }

}