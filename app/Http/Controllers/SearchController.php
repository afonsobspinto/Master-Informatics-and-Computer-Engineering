<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Auction;
use Illuminate\Support\Facades\DB;
use View;


class SearchController extends Controller
{
    private $MAX_NUM_RETURN_ITEMS = 10;

    protected function searchAuctions($rawSearchString, $offset, $maxNumItems, $categoryID) {
        $searchString = DB::getPdo()->quote($rawSearchString); //sanitize string for raw statements

        $auctions = Auction::getOpenAuctionsCollection();

        if($rawSearchString != null && trim($rawSearchString) != '') {
            $auctions = $auctions->whereRaw("search @@ plainto_tsquery('english', $searchString)")->
            orderByRaw("ts_rank(search, plainto_tsquery('english', $searchString)) DESC");
        }

        if(is_numeric($categoryID))
            $auctions = $auctions->where('category_id', '=', $categoryID);


        $auction = $auctions->skip($offset)->take($maxNumItems);
        return $auctions->get();
    }

    public function getSearchAuctions(Request $request) {
        $searchString = $request->input('search-input');
        $categoryID = $request->input('category');
        $offset = $request->input('offset');

        $auctions = $this->searchAuctions($searchString, $offset, $this->MAX_NUM_RETURN_ITEMS, $categoryID);


        $auctionViews = $auctions->map(
            function($auction)
            {
                return View::make('pages.components.auction', ['auction' => $auction ])->render();
            });

        return $auctionViews;
    }

    public function showSearch(Request $request) {
        $searchString = $request->input('search-input');
        $categoryID = $request->input('category');

        $auctions = $this->searchAuctions($searchString, 0, $this->MAX_NUM_RETURN_ITEMS, $categoryID);
        $categories = Category::all();

        return view('pages.search', [
            'categories' => $categories,
            'auctions' => $auctions,
            'searchString' => $searchString,
            'categoryID' => $categoryID,
        ]);
    }
}
