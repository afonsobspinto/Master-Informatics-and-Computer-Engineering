<?php

namespace App\Http\Controllers;

use App\ClosedAuction;
use App\QA;
use App\Wishlist;
use App\WonAuction;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use App\Auction;
use App\Category;
use App\City;
use App\Bid;
use App\Country;
use App\Messages;
use Carbon\Carbon;
use Auth;
use Illuminate\Http\Response;


class AuctionController extends Controller
{
    use ImageFileTraits;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $userId = Auth::user()->id;
        $categories = Category::all();
        $unreadMessages = Messages::countUnreadMessages($userId);
        $cities = City::allOrderedCities();
        $countries = Country::allOrderedCountries();
        $images = [$this->getAuctionPlaceholderURL()];

        return view('auctions.create', [
            'categories' => $categories,
            'cities' => $cities,
            'images' => $images,
            'unreadMessages' => $unreadMessages,
            'countries' => $countries
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title-input' => 'required',
            'condition-input' => 'required',
            'price-input' => 'required',
            'duration-input' => 'required',
            'photos-input.*' => $this->image_rule,

        ]);

        try {
            $auction = new Auction;
            $auction->item_name = $request->input('title-input');
            $auction->description = $request->input('description-input');
            $auction->condition = $request->input('condition-input');
            $auction->starting_price = $request->input('price-input');
            $auction->end_date = $request->input('duration-input');
            $auction->payment_type = 'Credit Card';
            $auction->shipping_options = 'No shipping';
            $auction->shipping_cost = $request->input('shippingPrice-input');
            $auction->owner_id = Auth::user()->id;
            $auction->category_id = $request->input('category');
            $auction->city_id = $request->input('city');;
            $auction->save();
        }
        catch (\Exception $e){
            return response()->json('Invalid Store', Response::HTTP_FORBIDDEN);
        }

        $files = $request->file('photos-input');
        $this->trySaveAuctionImages($files, $auction->id);


        return redirect('/');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $categories = Category::all();
        $auction = Auction::findOrFail($id);
        $qas = $auction->getQAs();
        $wishlists = $auction->getBids();
        $reviews = $auction->getAuctionOwnerReviews();

        return view('auctions.show', [
            'categories' => $categories,
            'auction' => $auction,
            'wishlists' => $wishlists,
            'qas' => $qas,
            'reviews' => $reviews
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $categories = Category::all();
        $auction = Auction::findOrFail($id);
        $images = $auction->getImagesURLs();
        $cities = City::all();

        return view('auctions.edit', [
            'categories' => $categories,
            'auction' => $auction,
            'images' => $images,
            'cities' => $cities
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title-input' => 'required',
            'photos-input.*' => $this->image_rule,
        ]);

        try {
            $auction = Auction::findOrFail($id);;
            $auction->item_name = $request->input('title-input');
            $auction->description = $request->input('description-input');
            $auction->condition = $request->input('condition-input');
            $auction->starting_price = $request->input('price-input');
            $auction->end_date = Carbon::tomorrow();
            $auction->payment_type = $request->input('payment-input');
            $auction->shipping_options = 'No shipping';
            $auction->shipping_cost = $request->input('shippingPrice-input');
            $auction->owner_id = Auth::user()->id;;
            $auction->category_id = $request->input('category');
            $auction->city_id = $request->input('city');
            $auction->save();
        }
        catch (\Exception $e){
            return response()->json('Invalid Update', Response::HTTP_FORBIDDEN);
        }

        $files = $request->file('photos-input');
        $this->trySaveAuctionImages($files, $auction->id);

        return redirect('/');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $auction_id)
    {
        $auction = Auction::findOrFail($auction_id);

        $password = $request->input('password');
        if(! Auth::user()->checkPassword($password))
            return response()->json('Invalid password', Response::HTTP_FORBIDDEN);

        try {
            $this->authorize('delete', $auction);
        } catch (AuthorizationException $e) {
            return response()->json('Auction not empty', Response::HTTP_FORBIDDEN);
        }

        $this->deleteAuctionFolder($auction->id);
        $auction->delete();


        return response()->json('', Response::HTTP_OK);
    }

    public function addToWishlist($id){

        try {
            $wishlist = new Wishlist();
            $wishlist->auction_id = $id;
            $wishlist->id = Auth::user()->id;
            $wishlist->save();
        }
        catch (\Exception$e) {
            return response()->json('Invalid Store', Response::HTTP_FORBIDDEN);
        }
        return redirect('auctions/' . $id);
    }

    public function removeFromWishlist($auction_id){
            $auction = Auction::findOrFail($auction_id);
            $auction->removeWishlist(Auth::user());

        return redirect('auctions/' . $auction_id);
    }

    public function storeQuestion(Request $request, $id){
        $this->validate($request, [
            'question-input' => 'required',
        ]);

        try {
            $qa = new QA();
            $qa->question = $request->input('question-input');
            $qa->answer = NULL;
            $qa->auction_id = $id;
            $qa->questioner_id = Auth::user()->id;
            $qa->save();
        }
        catch (\Exception$e) {
            return response()->json('Invalid Store', Response::HTTP_FORBIDDEN);
        }

        return redirect('auctions/' . $id);
    }

    public function storeAnswer(Request $request, $auction_id, $qa_id){
        $this->validate($request, [
            'answer-input' => 'required',
        ]);

        try {
            $answer = $request->input('answer-input');
            $auction = Auction::findOrFail($auction_id);
            $auction->answerQA($auction, $qa_id, $answer);
        }

        catch (\Exception$e) {
            return response()->json('Invalid Store', Response::HTTP_FORBIDDEN);
        }

        return redirect('auctions/' . $auction_id);

    }

    public function storeBid(Request $request, $id)
    {
        $this->validate($request, [
            'bid-amount' => 'required',
        ]);

        try {
            $bid = new Bid();
            $bid->id = $id;
            $bid->bidder_id = Auth::user()->id;
            $bid->bid_amount = $request->input('bid-amount');
            if(!$bid->isBidBigger($bid->bid_amount, $id))
                return response()->json('Invalid Store', Response::HTTP_FORBIDDEN);
            $this->destroyPreviousBid(Auction::findOrFail($id));
            $bid->save();
        }

        catch (\Exception$e){
            return response()->json('Invalid Store', Response::HTTP_FORBIDDEN);
        }


        return redirect('auctions/' . $id);
    }

    public function destroyPreviousBid($auction){
        try{
            $auction->deleteBids(Auth::user());

        }
        catch (\Exception$e){
            return response()->json('Invalid Store', Response::HTTP_FORBIDDEN);
        }


        return redirect('auctions/' . $auction->id);
    }

    public function getCurrentPrice($auctionID) {
        $auction = Auction::findOrFail($auctionID);

        return response()->json($auction->currentPriceEuros());
    }

    public function closeAuctions(){

        $auctionsToClose = Auction::getAuctionsToClose();
        foreach ($auctionsToClose as $auction){
            echo Auction::getAuctionWinner($auction->id) . " \n";
            $this->closeAuction($auction);
        }

    }

    private function closeAuction($auction){
        $this->storeClosed($auction->id);
        if($auction->starting_price	< $auction->current_price){
            $winnerID = $auction->getAuctionWinner($auction->id);
            $this->storeWon($auction->id, $winnerID);
        }
    }

    private function storeClosed($auctionID){

        try {
            $closedAuction = new ClosedAuction();
            $closedAuction->id = $auctionID;
            $closedAuction->save();
        }
        catch (\Exception$e) {
            return response()->json('Invalid Store', Response::HTTP_FORBIDDEN);
        }

        return true;
    }

    private function storeWon($auctionID, $winnerID){

        try {
            $wonAuction = new WonAuction();
            $wonAuction->id = $auctionID;
            $wonAuction->is_successful_transaction = true;
            $wonAuction->has_winner_complained = false;
            $wonAuction->winner_id = $winnerID;
            $wonAuction->save();
        }
        catch (\Exception$e) {
            return response()->json('Invalid Store', Response::HTTP_FORBIDDEN);
        }

        return true;

    }
}

