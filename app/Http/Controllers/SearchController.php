<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Auction;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{

    protected function searchAuctions($rawSearchString, $offset, $maxNumItems, $categoryID) {
        $searchString = DB::getPdo()->quote($rawSearchString); //sanitize string for raw statements

        $auctions = Auction::getOpenAuctionsCollection()->
            whereRaw("search @@ plainto_tsquery('english', $searchString)")->
            orderByRaw("ts_rank(search, plainto_tsquery('english', $searchString)) DESC");

        if(is_numeric($categoryID))
            $auctions = $auctions->where('category_id', '=', $categoryID);


        $auction = $auctions->skip($offset)->take($maxNumItems);
        return $auctions->get();
    }

    public function showSearch(Request $request) {
        $searchString = $request->input('search-input');
        $categoryID = $request->input('category');

        $auctions = $this->searchAuctions($searchString, 0, 5, $categoryID);
        $categories = Category::all();

        return view('pages.search', [
            'categories' => $categories,
            'auctions' => $auctions,
        ]);
    }
}
