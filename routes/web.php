<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('landing_page');
});


// static pages
Route::get('landing_page', 'StaticPagesController@showLandingPage');
Route::get('about', 'StaticPagesController@showAbout');
Route::get('faq', 'StaticPagesController@showFAQ');

// auctions
//Route::get('auctions/{auction_id}', 'AuctionController@show');
//Route::delete('auctions/{auction_id}', 'AuctionController@delete');
//
//Route::get('auctions/{auction_id}/delete', 'AuctionController@delete');

Route::resource('auctions', 'AuctionController');

//
Route::resource('messages', 'MessageController');



// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Registration Routes...
Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('register', 'Auth\RegisterController@register');


//Route::get('/home', 'HomeController@index')->name('home');
