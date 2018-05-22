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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        $categories = Category::all();
        $countries = Country::allOrderedCountries();
        $cities = $user->getCountry()->getAllCities();
        $profilePic = $this->getProfilePictureURL($id);
        $itemsForSale = $user->getItemsForSale();
        $wishlist = $user->getWishlist();
        $biddingItems = $user->getBiddingItems();
        $purchaseHistory = $user->getPurchaseHistory();
        $feedback = $user->getFeedback();

        return view('profile.show', [
            'categories' => $categories,
            'countries' => $countries,
            'cities' => $cities,
            'user' => $user,
            'zip_code_regex' => $this->zip_code_regex,
            'profile_picture' => $profilePic,
            'itemsForSale' => $itemsForSale,
            'wishlist' => $wishlist,
            'biddingItems' => $biddingItems,
            'purchaseHistory' => $purchaseHistory,
            'feedback' => $feedback,
        ]);
    }

    public function edit($id) {

        $user = User::findOrFail($id);

        if(!Auth::check() || Auth::id() != $id)
            return response("stop right there baddie", Response::HTTP_FORBIDDEN);


        $categories = Category::all();
        $countries = Country::allOrderedCountries();
        $cities = $user->getCountry()->getAllCities();
        $profilePic = $this->getProfilePictureURL($id);

        return view('profile.edit', [
            'categories' => $categories,
            'countries' => $countries,
            'cities' => $cities,
            'user' => $user,
            'zip_code_regex' => $this->zip_code_regex,
            'profile_picture' => $profilePic,
        ]);
    }



    public function update(Request $request, $id) {

        if(!Auth::check() || Auth::id() != $id)
            return response("stop right there baddie", Response::HTTP_FORBIDDEN);

        $user = Auth::user();



        $this->validate($request, [
            'username' => $this->buildUsernameRule(Rule::unique('users')->ignore($user->id)),
            'email' => $this->buildEmailRule(Rule::unique('users')->ignore($user->id)),
            'password' =>  $this->buildCheckedPasswordRule(),
            'first_name' => $this->name_rule,
            'last_name' => $this->name_rule,
            'zip_code' => $this->getZipCodeRule(),
            'address' => $this->address_rule,
            'city' => $this->id_rule,
            'picture' => $this->image_rule,
        ]);

        $newPass = $request->input('new_password');
        $bChangePass = $newPass != null && $newPass != '';

        if($bChangePass)
            $this->validate($request, [
                'new_password' =>  $this->buildPasswordRule('confirmed'),
            ]);



        try {

            $user->username = $request->input('username');
            $user->first_name = $request->input('first_name');
            $user->last_name = $request->input('last_name');
            if($bChangePass)
                $user->password = Hash::make($newPass);
            $user->email = $request->input('email');
            $user->zip_code = $request->input('zip_code');
            $user->address = $request->input('address');
            $user->location = $request->input('city');
            $user->save();
        }
        catch (\Exception $e){
            return response('Invalid Update', Response::HTTP_FORBIDDEN);
        }

        $file = $request->file('picture');
        $this->tryStoreProfilePicture($file, Auth::id());

        return redirect( url('/') );

//        TODO when done
//        return redirect( url('profile', [Auth::id()] ) );
    }
}