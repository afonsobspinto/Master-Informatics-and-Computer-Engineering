<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\ImageFileTraits;
use App\Http\Controllers\UserTraits;
use App\Mail\VerifyEmail;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use App\Category;
use App\Country;

use Illuminate\Http\Request;

use App\VerifyUser;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyMail;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    use UserTraits;
    use ImageFileTraits;


    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Show the application registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showRegistrationForm()
    {
        $categories = Category::all();
        $countries = Country::allOrderedCountries();
        $profilePic = $this->getUserPlaceholderURL();

        return view('auth.register', [
            'categories' => $categories,
            'countries' => $countries,
            'zip_code_regex' => $this->zip_code_regex,
            'profile_picture' => $profilePic,
        ]);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {

        return Validator::make($data, [
            'username' => $this->buildUsernameRule('unique:users'),
            'email' => $this->buildEmailRule('unique:users'),
            'password' =>  $this->buildPasswordRule('confirmed'),
            'first_name' => $this->name_rule,
            'last_name' => $this->name_rule,
            'zip_code' => $this->getZipCodeRule(),
            'address' => $this->address_rule,
            'city' => $this->id_rule,
            'picture' => $this->image_rule,
        ]);



    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $user =  User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'zip_code' => strtoupper($data['zip_code']),
            'address' => $data['address'],
            'location' => $data['city'],
        ]);

        if(array_key_exists('picture', $data))
            $this->tryStoreProfilePicture($data['picture'], $user->id);

        $verifyUser = VerifyUser::create([
            'user_id' => $user->id,
            'token' => str_random(40)
        ]);

        Mail::to($user->email)->send(new VerifyMail($user));

        return $user;
    }

    public function verifyUser($token)
    {
        $verifyUser = VerifyUser::where('token', $token)->first();
        if(isset($verifyUser) ){
            $user = $verifyUser->user;
            if(!$user->verified) {
                $user->verified = true;
                $user->save();
                $verifyUser->delete();
                $status = "Your e-mail is verified. You can now login.";
            }else{
                $status = "Your e-mail is already verified. You can now login.";
            }
        }else{
            return redirect('/login')->with('error', "Sorry your email cannot be identified.");
        }

        return redirect('/login')->with('status', $status);
    }

    protected function registered(Request $request, $user)
    {
        $this->guard()->logout();
        return redirect('/login')->with('error', 'We sent you an activation code. Check your email and click on the link to verify.');
    }

}
