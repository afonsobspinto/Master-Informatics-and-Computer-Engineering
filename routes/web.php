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
Route::resource('auctions', 'AuctionController');
Route::post('auctions/{id}/wishlist', 'AuctionController@addToWishlist');

// bids
Route::post('auctions/{id}/storeBid', 'AuctionController@storeBid')->name('auctions.storeBid');

//Reports
Route::resource('reports', 'ReportsController');
Route::post('report', 'ReportsController@storeUserReport')->name('reports.storeReport');
Route::post('reports', 'ReportsController@store')->name('reports.store');

//messages
Route::resource('messages', 'MessagesController');
Route::post('message', 'MessagesController@storeSpecificMessage')->name('messages.storeMessage');
Route::post('messages', 'MessagesController@store')->name('messages.store');
Route::delete('messages', 'MessagesController@deleteAllMessages')->name('messages.delete');
Route::get('messages/sendMessage/{userName}/{subject}', 'MessagesController@sendMessage')->name('messages.sendMessage');
Route::get('contact/{userName}/{auctionID}', 'MessagesController@contact')->name('messages.contact');
Route::get('messages_sent', 'MessagesController@index_sent');
Route::get('messages_sent/{id}', 'MessagesController@show_sent')->name('messages.show_sent');

//reports
Route::resource('reports', 'ReportsController');

//profile
Route::resource('profile', 'ProfileController');
Route::get('profile/{id}/unread-messages', 'ProfileController@getNumMessages');

// search
Route::get('search', 'SearchController@showSearch');
Route::get('search/auctions', 'SearchController@getSearchAuctions');


// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Registration Routes...
Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('register', 'Auth\RegisterController@register');


//Route::get('/home', 'HomeController@index')->name('home');
//other API
Route::get('country/{id}/cities', 'CountryController@getCities')->where('id', '[0-9]+');
