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
        @foreach($auctions as $auction)
        <li class="auction-item">
            <a href="{{ url("auctions/{$auction->id}") }}" class="d-flex">
                <div>
                    <img class="auction-image" src="{{ $auction->getDisplayPictureURL() }}" alt="auction image">
                </div>
                <div class="auction-text">
                    <h4> {{ $auction->item_name }} </h4>
                    <p class="d-flex justify-content-between">
                        <span>
                            <b>EUR {{ $auction->currentPriceEuros() }},</b>
                            <span class="text-muted">{{ $auction->numBids() }} Bids </span>
                        </span>
                        <span class="text-muted"> {{ $auction->getTimeLeftString() }} left </span>
                    </p>
                    <p>{{ str_limit($auction->description, 150, ' ...') }}</p>
                </div>
            </a>
        </li>
        @endforeach
        </ul>
    </div>

@endsection
