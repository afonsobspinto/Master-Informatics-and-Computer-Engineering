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
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;

use Illuminate\Http\Request;

class AuctionController extends Controller
{

    public function show(Request $request, $auction_id) {
        $categories = Category::all();
        $auction = Auction::findOrFail($auction_id);

        return view('pages.auction', [
            'categories' => $categories,
            'auction' => $auction
        ]);
    }

    public function delete(Request $request, $auction_id) {

        $auction = Auction::findOrFail($auction_id);

        $password = $request->input('password');
        if(! Auth::user()->checkPassword($password))
        return response()->json('Invalid password', 400);

        try {
            $this->authorize('delete', $auction);
        } catch (AuthorizationException $e) {
            return response()->json('Auction not empty', 400);
        }

        $auction->delete();
        return response()->json('', 200);
    }

}