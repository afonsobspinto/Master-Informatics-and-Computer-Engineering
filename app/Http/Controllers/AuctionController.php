<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use App\Auction;
use App\Category;
use App\City;
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
        $categories = Category::all();
        $cities = City::all();
        $images = [$this->getAuctionPlaceholderURL()];

        return view('auctions.create', [
            'categories' => $categories,
            'cities' => $cities,
            'images' => $images,
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
            $auction->payment_type = 'PayPal';
            $auction->shipping_options = 'No shipping';
            $auction->shipping_cost = $request->input('shippingPrice-input');
            $auction->owner_id = Auth::user()->id;
            $auction->category_id = 1;
            $auction->city_id = 1;
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

        return view('auctions.show', [
            'categories' => $categories,
            'auction' => $auction
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

        return view('auctions.edit', [
            'categories' => $categories,
            'auction' => $auction,
            'images' => $images,
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
            $auction->payment_type = 'PayPal';
            $auction->shipping_options = 'No shipping';
            $auction->shipping_cost = $request->input('shippingPrice-input');
            $auction->owner_id = Auth::user()->id;;
            $auction->category_id = 1;
            $auction->city_id = 1;
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
}

