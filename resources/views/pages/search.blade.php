@extends('layouts.base', ['categories' => $categories, 'searchString' => $searchString, 'categoryID' => $categoryID])

@section('title', 'Search')

@section('resources')
    @parent
    <link rel="stylesheet" href="{{ asset('css/advanced_search.css') }}">
@endsection

@section('body-class', 'd-flex')

@section('content')
    {{-- Sidebar --}}
    <form id="sidebar" class="sidebar-nav ">
        <div class="format">
            <h5> Look for </h5>
            <div class="radio">
                <label><input type="radio" name="buy-type">All listings </label>
                <label><input type="radio" name="buy-type">Auction </label>
                <label><input type="radio" name="buy-type">Buy It Now</label>
            </div>
        </div>

        <div class="condition">
            <h5> Condition </h5>
            <div class="radio">
                <label><input type="radio" name="condition"> New </label>
                <label><input type="radio" name="condition"> Used </label>
                <label><input type="radio" name="condition"> Not Specified </label>
            </div>
        </div>

        <div class="price">
            <h5> Price (EUR)   </h5>
            <div class="price">
                <input type="number" min="0"  placeholder="Min">
                <input type="number" min="0"  placeholder="Max">
            </div>
        </div>

        <div class="location">
            <h5> Item Location </h5>
            <div class="radio">
                <label><input type="radio" name="country"> BidBay </label>
                <label><input type="radio" name="country"> Asia </label>
                <label><input type="radio" name="country">Africa </label>
                <label><input type="radio" name="country">America</label>
                <label><input type="radio" name="country">Europe</label>
                <label><input type="radio" name="country">Australia</label>
            </div>
        </div>
    </form>

    {{-- page contents --}}
    <div id="main">
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
