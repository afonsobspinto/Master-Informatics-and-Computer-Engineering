@extends('layouts.base', ['categories' => $categories])

@section('title', 'Search')

@section('resources')
    @parent
    <link rel="stylesheet" href="{{ asset('css/advanced_search.css') }}">
@endsection

@section('body-class', 'container-fluid row')

@section('content')
    {{-- Sidebar --}}
    <div class="col-sm-3" id="sidebar">
        <ul class="sidebar-nav ">
            <div class="format">
                <h5> Look for </h5>

                <div class="radio">
                    <label><input type="radio" name="optradio"> All listings </label>
                </div>
                <div class="radio">
                    <label><input type="radio" name="optradio">Auction </label>
                </div>
                <div class="radio">
                    <label><input type="radio" name="optradio">Buy It Now</label>
                </div>
            </div>

            <div class="price">
                <h5>   Price &nbsp;   <i class="fas fa-euro-sign"></i>   </h5>
                <div>
                    <input class="col-xs-2" type="number" min="0"  placeholder="Min">
                    <br>
                    <input class="col-xs-2" type="number" min="0"  placeholder="Max">
                </div>

            </div>

            <div class="category">
                <h5> Categories </h5>
                <li>
                    <a href="#">Technology</a>
                </li>
                <li>
                    <a href="#">Clothes</a>
                </li>
                <li>
                    <a href="#">Automobiles</a>
                </li>
            </div>

            <div class="location">
                <h5> Item Location </h5>
                <div class="radio">
                    <label><input type="radio" name="optradio"> BidBay </label>
                </div>
                <div class="radio">
                    <label><input type="radio" name="optradio"> Asia </label>
                </div>
                <div class="radio">
                    <label><input type="radio" name="optradio">Africa </label>
                </div>
                <div class="radio">
                    <label><input type="radio" name="optradio">America</label>
                </div>
                <div class="radio">
                    <label><input type="radio" name="optradio">Europe</label>
                </div>
                <div class="radio">
                    <label><input type="radio" name="optradio">Australia</label>
                </div>
            </div>

            <div class="condition">
                <h5> Condition </h5>
                <div class="radio">
                    <label><input type="radio" name="optradio"> New </label>
                </div>
                <div class="radio">
                    <label><input type="radio" name="optradio"> Used </label>
                </div>
                <div class="radio">
                    <label><input type="radio" name="optradio"> Not Specified </label>
                </div>
            </div>
        </ul>

    </div>

    {{-- page contents --}}
    <div class="col-sm-9" id="main">
            <ul>
                <li id="1res">
                    <div class="row">
                        <div class="col">
                            <div class="container">
                                <p></p>
                                <h4> <a href="auction/auction.html">Computador para minar Bitcoins</a> </h4>
                                <p></p>
                                <img id="img" src="http://www.bbxuk.com/wp-content/uploads/2015/05/computer-05.jpg" alt="result 1" width="40%">
                            </div>
                        </div>
                        <div class="col">
                            <p></p>
                            <p class="priceResult">EUR 20.000</p>
                            <p>15 Bids</p>
                            <p> 3d 21h left (wednesday, 2PM)</p>
                            <p>From Portugal</p>
                        </div>
                    </div>
                </li>
                <li id="2res">
                    <div class="row">
                        <div class="col">
                            <div class="container">
                                <p></p>
                                <h4> <a href="auction/auction.html">Computador para minar Bitcoins</a> </h4>
                                <img id="img" src="http://www.bbxuk.com/wp-content/uploads/2015/05/computer-05.jpg" alt="result 1" width="40%">
                                <p></p>
                            </div>
                        </div>
                        <div class="col">
                            <p></p>
                            <p class="priceResult">EUR 20.000</p>
                            <p>15 Bids</p>
                            <p> 3d 21h left (wednesday, 2PM)</p>
                            <p>From Portugal</p>
                        </div>
                    </div>
                </li>
                <li id="3res">
                    <div class="row">
                        <div class="col">
                            <div class="container">
                                <p></p>
                                <h4> <a href="auction/auction.html">Computador para minar Bitcoins</a> </h4>
                                <p></p>
                                <img id="img" src="http://www.bbxuk.com/wp-content/uploads/2015/05/computer-05.jpg" alt="result 1" width="40%">
                            </div>
                        </div>
                        <div class="col">
                            <p></p>
                            <p class="priceResult">EUR 20.000</p>
                            <p>15 Bids</p>
                            <p> 3d 21h left (wednesday, 2PM)</p>
                            <p>From Portugal</p>
                        </div>
                    </div>
                </li>
                <li id="3res">
                    <div class="row">
                        <div class="col">
                            <div class="container">
                                <p></p>
                                <h4> <a href="auction/auction.html">Computador para minar Bitcoins</a> </h4>
                                <img id="img" src="http://www.bbxuk.com/wp-content/uploads/2015/05/computer-05.jpg" alt="result 1" width="40%">
                                <p></p>
                            </div>
                        </div>
                        <div class="col">
                            <p></p>
                            <p class="priceResult">EUR 20.000</p>
                            <p>15 Bids</p>
                            <p> 3d 21h left (wednesday, 2PM)</p>
                            <p>From Portugal</p>
                        </div>
                    </div>
                </li>

            </ul>

        </div>

@endsection
