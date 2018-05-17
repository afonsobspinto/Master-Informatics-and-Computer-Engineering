@extends('layouts.base', ['categories' => $categories, 'searchString' => $searchString, 'categoryID' => $categoryID])

@section('title', 'Search')

@section('resources')
    @parent
    <script src="{{ asset('js/search.js') }}" defer></script>
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
        <ul id="search-auctions-container">
        @foreach($auctions as $auction)
            @include('pages.components.auction', ['auction' => $auction])
        @endforeach
        </ul>

        <div id="load-more-div">
            <button id="load-more" type="button" class="btn btn-outline-primary">Load More</button>
            <p id="no-more-auctions" class="text-danger">No more auctions found. </p>
        </div>
    </div>

@endsection
