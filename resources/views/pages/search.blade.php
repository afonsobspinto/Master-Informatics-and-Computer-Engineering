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
        {{--<div class="format">--}}
            {{--<h5> Look for </h5>--}}
            {{--<div class="radio">--}}
                {{--<label><input type="radio" name="buy-type" value="all">All listings </label>--}}
                {{--<label><input type="radio" name="buy-type">Auction </label>--}}
                {{--<label><input type="radio" name="buy-type">Buy It Now</label>--}}
            {{--</div>--}}
        {{--</div>--}}

        {{--<div class="condition">--}}
            {{--<h5> Condition </h5>--}}
            {{--<div class="radio">--}}
                {{--<label><input type="radio" name="item-condition" checked="checked" value="ALL"> Not Specified </label>--}}
                {{--<label><input type="radio" name="item-condition"> New </label>--}}
                {{--<label><input type="radio" name="item-condition"> Used </label>--}}
            {{--</div>--}}
        {{--</div>--}}

        <div class="price">
            <h5> Price (EUR)   </h5>
            <div class="price">
                <label for="min-price" hidden>Min Price:</label>
                <input id="min-price" type="number" min="0"  placeholder="Min" name="min-price">
                <label for="max-price" hidden>Max Price:</label>
                <input type="number" min="0"  placeholder="Max" name="max-price">
            </div>
        </div>

        <div class="location">
            <h5> Item Location </h5>
            <label for="country">Country:</label>
            <select class="form-control" id="country" name="country" aria-describedby="Country">
                <option value="ANY" selected> All Countries </option>
                @foreach($countries as $country)
                    <option value="{{ $country->id }}">{{ ucfirst($country->country) }}</option>
                @endforeach
            </select>
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
