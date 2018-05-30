@extends('layouts.base', ['categories' => $categories])

@section('title', $auction->item_name)

@section('resources')
    @parent
    <script src="{{ asset('js/auction_form.js') }}" defer></script>
    <link rel="stylesheet" href="{{ asset('css/auction_form.css') }}">
@endsection

@section('content')
    <div class="container mt-4" id="sell-section">

        <h1 class="border-bottom pb-1 mb-4 h2">Edit {{ $auction->getAuctionOwner() }}'s auction</h1>

        <form method="POST" enctype="multipart/form-data" action="{{action('AuctionController@update', [$auction->id])}}">
            <fieldset>
                <legend hidden>Edit {{ $auction->getAuctionOwner() }}'s auction:</legend>
                <h2 class="border-bottom pb-1 mb-4 h4">Auction details</h2>

                <input type="hidden" name="_method" value="PUT">
                <input name="_token" type="hidden" value="{{ csrf_token() }}"/>

                <div class="form-group row">
                    <label for="title-input" class="col-3 col-form-label">Title</label>
                    <div class="col-9">
                        <input class="form-control" type="text" value="{{$auction->item_name}}" name="title-input" id="title-input" required>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="category-input" class="col-3 col-form-label">Category</label>
                    <div class="col-9">
                        <select class="form-control" id="category-input" name="category" aria-describedby="Category" required>
                            <option value="" {{ old('category') ? '' : 'selected' }}>All Categories</option>
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}" {{ old('category') == $category->id ? 'selected' : '' }}>{{ ucfirst($category->name) }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="description-input" class="col-3 col-form-label">Description</label>
                    <div class="col-9">
                        <input class="form-control" type="text" value="{{$auction->description}} " name="description-input" id="description-input" required>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="condition-input" class="col-3 col-form-label">Condition</label>
                    <div class="col-9">
                        <select class="form-control" name="condition-input" id="condition-input">
                            <option selected hidden>{{ $auction->condition }}</option>
                            <option>New</option>
                            <option>Used</option>
                            <option>Not Working</option>
                        </select>
                    </div>
                </div>

                @include('auctions.components.form_images', ['images' => $images ])


                <div class="form-group row">
                    <label for="price-input" class="col-3 col-form-label">Starting price</label>
                    <div class="col-9 input-group">
                        <input class="form-control" type="number" value="{{$auction->starting_price}}"
                               aria-label="Amount (to the nearest euro)" name="price-input" id="price-input" required disab>
                        <div class="input-group-append">
                            <span class="input-group-text">€</span>
                        </div>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="shipping-input" class="col-3 col-form-label">Shipping options</label>
                    <div class="col-9 input-group" id="shipping-input">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="domesticShipping" id="domesticShipping" value="domesticShipping">
                            <label class="form-check-label" for="domesticShipping">
                                Domestic shipping
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="internationalShipping" id="internationalShipping"
                                   value="internationalShipping" checked>
                            <label class="form-check-label" for="internationalShipping">
                                International Shipping
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="localPickup" id="localPickup"
                                   value="localPickup">
                            <label class="form-check-label" for="localPickup">
                                No shipping: Local pickup only
                            </label>
                        </div>
                    </div>
                </div>


                <div class="form-group row">
                    <label for="shippingPrice-input" class="col-3 col-form-label">Cost</label>
                    <div class="col-9 input-group">
                        <input class="form-control" type="number" value="{{$auction->shipping_cost}}"
                               aria-label="Amount (to the nearest euro)" name="shippingPrice-input" id="shippingPrice-input">
                        <div class="input-group-prepend">
                            <span class="input-group-text">€</span>
                        </div>
                        <div class="form-group collapse col-12" id='calculated_option'>
                            <div class="card border">
                                Please insert the price per kg. We will use it as well with the item location to calculate the shipping cost.
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="city-input" class="col-3 col-form-label">City</label>
                    <div class="col-9">
                        <select class="form-control" id="city-input" name="city" aria-describedby="City" required>
                            <option value="" {{ old('city') ? '' : 'selected' }}>All Cities</option>
                            @foreach($cities as $city)
                                <option value="{{ $city->id }}" {{ old('city') == $city->id ? 'selected' : '' }}>{{ ucfirst($city->city) }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="text-right mb-3 mt-3">
                    <button type="submit" class="btn btn-primary">Save</button>
                    <a type="button" class="btn btn-secondary" href="auction_asAuctioneer.html">Cancel</a>
                </div>

            </fieldset>
        </form>


    </div>
@endsection