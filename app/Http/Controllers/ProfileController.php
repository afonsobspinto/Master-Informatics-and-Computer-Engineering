<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use App\Category;
use App\Auction;
use App\Country;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use App\User;

class ProfileController extends Controller
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $categories = Category::all();

        return view('profile.show', [
            'categories' => $categories
        ]);
    }

    public function edit($id) {

        $user = User::findOrFail($id);

        if(!Auth::check() || Auth::id() != $id)
            return response("stop right there baddie", Response::HTTP_FORBIDDEN);


        $categories = Category::all();
        $countries = Country::allOrderedCountries();
        $cities = $user->getCountry()->getAllCities();

        return view('profile.edit', [
            'categories' => $categories,
            'countries' => $countries,
            'cities' => $cities,
            'user' => $user,
        ]);
    }
}