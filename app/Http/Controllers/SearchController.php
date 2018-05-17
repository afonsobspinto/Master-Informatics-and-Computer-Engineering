<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Auction;
use Illuminate\Support\Facades\DB;
use View;
use App\Country;


class SearchController extends Controller
{
    private $MAX_NUM_RETURN_ITEMS = 2;

    protected function searchAuctions($rawSearchString, $offset, $maxNumItems, $categoryID, $minPrice, $maxPrice, $countryID) {
        $searchString = DB::getPdo()->quote($rawSearchString); //sanitize string for raw statements

        $auctions = Auction::getOpenAuctionsCollection();

        if($rawSearchString != null && trim($rawSearchString) != '') {
            $auctions = $auctions->whereRaw("search @@ plainto_tsquery('english', $searchString)")->
            orderByRaw("ts_rank(search, plainto_tsquery('english', $searchString)) DESC");
        }

        if(is_numeric($categoryID))
            $auctions = $auctions->where('category_id', '=', $categoryID);


        if(is_numeric($minPrice))
            $auctions = $auctions->where('current_price', '>=', $minPrice);

        if(is_numeric($maxPrice))
            $auctions = $auctions->where('current_price', '<=', $maxPrice);

        if(is_numeric($countryID)) {
            $auctions = $auctions->join('cities', 'auctions.city_id', '=', 'cities.country_id')->select('auctions.*');
            $auctions = $auctions->where('country_id', '=', $countryID)->distinct();
        }

        $auction = $auctions->skip($offset)->take($maxNumItems);
        return $auctions->get();
    }

    protected function getAuctions(Request $request) {
        $searchString = $request->input('search-input');
        $categoryID = $request->input('category');
        $offset = $request->input('offset');
        $minPrice = $request->input('min-price');
        $maxPrice = $request->input('max-price');
        $countryID = $request->input('country');

        return $this->searchAuctions($searchString, $offset, $this->MAX_NUM_RETURN_ITEMS, $categoryID, $minPrice, $maxPrice, $countryID);
    }

    public function getSearchAuctions(Request $request) {
        $auctions = $this->getAuctions($request);

        $auctionViews = $auctions->map(
            function($auction)
            {
                return View::make('pages.components.auction', ['auction' => $auction ])->render();
            });

        return $auctionViews;
    }

    public function showSearch(Request $request) {
        $auctions = $this->getAuctions($request);
        $categories = Category::all();

        $searchString = $request->input('search-input');
        $categoryID = $request->input('category');

        return view('pages.search', [
            'categories' => $categories,
            'auctions' => $auctions,
            'searchString' => $searchString,
            'categoryID' => $categoryID,
            'countries' => Country::allOrderedCountries(),
        ]);
    }
}
