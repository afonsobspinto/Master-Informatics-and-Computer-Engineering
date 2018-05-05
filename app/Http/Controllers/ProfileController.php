<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use App\Category;
use App\Auction;
use App\Country;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\User;

use Illuminate\Validation\Rule;

class ProfileController extends Controller
{

    use UserTraits;

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

    public function update(Request $request, $id) {

        if(!Auth::check() || Auth::id() != $id)
            return response("stop right there baddie", Response::HTTP_FORBIDDEN);

        $user = Auth::user();


        $this->validate($request, [
            'username' => $this->buildUsernameRule(Rule::unique('users')->ignore($user->id)),
            'email' => $this->buildEmailRule(Rule::unique('users')->ignore($user->id)),
            'password' =>  $this->buildPasswordRule(
                function($attribute, $value, $fail) {
                    if (! Auth::user()->checkPassword($value))
                        return $fail('Wrong password.');
                }),
            'first_name' => $this->name_rule,
            'last_name' => $this->name_rule,
            'zip_code' => $this->zip_code_rule,
            'address' => $this->address_rule,
            'city' => $this->id_rule,
        ]);

        $bChangePass = $request->input('new_password') != null && $request->input('new_password') != '';
        if($bChangePass)
            $this->validate($request, [
                'new_password' =>  $this->buildPasswordRule('confirmed'),
            ]);


        try {

            $user->username = $request->input('username');
            $user->first_name = $request->input('first_name');
            $user->last_name = $request->input('last_name');
            if($bChangePass)
                $user->password = Hash::make($request->input('new_password'));
            $user->email = $request->input('email');
            $user->zip_code = $request->input('zip_code');
            $user->address = $request->input('address');
            $user->location = $request->input('city');
            $user->save();
        }
        catch (\Exception $e){
            return response('Invalid Update', Response::HTTP_FORBIDDEN);
        }

        return redirect( url('/') );

//        TODO when done
//        return redirect( url('profile', [Auth::id()] ) );
    }
}