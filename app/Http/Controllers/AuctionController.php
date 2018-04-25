<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Auction;
use App\Category;
use App\City;
use Carbon\Carbon;
use Auth;


class AuctionController extends Controller
{
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


        return view('auctions.create', [
            'categories' => $categories,
            'cities' => $cities,
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
            'title-input' => 'required'
        ]);

        $auction = new Auction;
        $auction->item_name =  $request->input('title-input');
        $auction->description = 'The Volkswagen Polo is a car produced by the German manufacturer Volkswagen since 1975. It is sold in Europe and other markets worldwide in hatchback, sedan and estate variants. The Polo has been produced in six generations. Related Volkswagen Group models include the Škoda Fabia, SEAT Ibiza and Audi A1.';
        $auction->condition = 'Used';
        $auction->end_date = Carbon::tomorrow();
        $auction->payment_type ='PayPal';
        $auction->shipping_options =   'No shipping';
        $auction->shipping_cost =    494.59;
        $auction->owner_id =   1;
        $auction->category_id =  1;
        $auction->city_id =   1;
        $auction->save();

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

        //if(Auth::user()->id == $id){
        return view('auctions.show_owner', [
            'categories' => $categories,
            'auction' => $auction
        ]);
        //}
/*        else{
            return view('auctions.show', [
                'categories' => $categories,
                'auction' => $auction
            ]);
        }*/
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

        return view('auctions.edit', [
            'categories' => $categories,
            'auction' => $auction
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
            'title-input' => 'required'
        ]);

        $auction = Auction::findOrFail($id);;
        $auction->item_name =  $request->input('title-input');
        $auction->description = 'The Volkswagen Polo is a car produced by the German manufacturer Volkswagen since 1975. It is sold in Europe and other markets worldwide in hatchback, sedan and estate variants. The Polo has been produced in six generations. Related Volkswagen Group models include the Škoda Fabia, SEAT Ibiza and Audi A1.';
        $auction->condition = 'Used';
        $auction->end_date = Carbon::tomorrow();
        $auction->payment_type ='PayPal';
        $auction->shipping_options =   'No shipping';
        $auction->shipping_cost =    494.59;
        $auction->owner_id =   1;
        $auction->category_id =  1;
        $auction->city_id =   1;
        $auction->save();

        return redirect('/');    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
