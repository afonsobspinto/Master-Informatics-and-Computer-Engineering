@extends('layouts.base', ['categories' => $categories])

@section('title', $auction->item_name)

@section('resources')
    @parent
    <script src="{{ asset('js/auction_form.js') }}" defer></script>
    <link rel="stylesheet" href="{{ asset('css/auction_form.css') }}">
@endsection

@section('content')
    <div class="container mt-4" id="sell-section">

        <h1 class="border-bottom pb-1 mb-4 h2">Edit Auctioneer Name's auction</h1>

        <form method="POST" enctype="multipart/form-data" action="{{action('AuctionController@update', [$auction->id])}}">
            <h2 class="border-bottom pb-1 mb-4 h4">Auction details</h2>

            <input type="hidden" name="_method" value="PUT">
            <input name="_token" type="hidden" value="{{ csrf_token() }}"/>

            <div class="form-group row">
                <label for="title-input" class="col-3 col-form-label">Title</label>
                <div class="col-9">
                    <input class="form-control" type="text" value="{{$auction->item_name}}" name="title-input" id="title-input" required>
                </div>
            </div>

            {{--<div class="form-group row">
                <label for="category-input" class="col-3 col-form-label">Category</label>
                <div class="col-9">
                    <select class="form-control" id="category-input">
                        <option hidden> -</option>
                        <option selected>Technology</option>
                        <option>Automobiles</option>
                        <option>Clothes</option>
                    </select>
                </div>
            </div>--}}
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
                        <option hidden> -</option>
                        <option selected>New</option>
                        <option>Used</option>
                        <option>Not Working</option>
                    </select>
                </div>
            </div>

            {{--<div class="form-group row">
                <label class="col-3 col-form-label">Photos</label>

                <div class="photos col-8">
                    <div class="d-inline" id="img1">
                        <img class="img-fluid d-inline col-3"
                             src="https://s-media-cache-ak0.pinimg.com/originals/ef/60/11/ef60116e7e4bf72ed1014afe9e784867.jpg"
                             alt="First slide">
                        <a href="#" class="fas fa-trash-alt text-danger" onclick="$( '#img1' ).remove();"></a>
                    </div>
                    <div class="d-inline" id="img2">
                        <img class="img-fluid d-inline col-3"
                             src="https://s-media-cache-ak0.pinimg.com/originals/ef/60/11/ef60116e7e4bf72ed1014afe9e784867.jpg"
                             alt="First slide"
                        >
                        <a href="#" class="fas fa-trash-alt text-danger" onclick="$( '#img2' ).remove();"></a>
                    </div>
                    <div class="d-inline" id="img3">
                        <img class="img-fluid d-inline col-3"
                             src="https://s-media-cache-ak0.pinimg.com/originals/ef/60/11/ef60116e7e4bf72ed1014afe9e784867.jpg"
                             alt="First slide">
                        <a href="#" class="fas fa-trash-alt text-danger" onclick="$( '#img3' ).remove();"></a>
                    </div>--}}
            {{-- MODIFIED --}}
            {{-- Pictures --}}
            @include('auctions.components.form_images', ['images' => $images ])
            {{-- /MODIFIED --}}
            {{--
                </div>
            </div>--}}

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

            {{--<div class="form-group row">
                <label for="duration-input" class="col-3 col-form-label">End of auction</label>
                <div class="col-9 input-group">
                    <input class="form-control" type="datetime-local" value="{{$auction->duration}}"
                           id="duration-input" required>
                </div>
            </div>

            <div class="form-group row">
                <label for="payment-input" class="col-3 col-form-label">Payment options</label>
                <div class="col-9 input-group" id="payment-input">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="atmPayment" id="atmPayment" value="atmPayment"
                               checked>
                        <label class="form-check-label" for="atmPayment">
                            ATM Reference
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="paypalPayment" id="paypalPayment"
                               value="paypalPayment" checked>
                        <label class="form-check-label" for="paypalPayment">
                            Paypal
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="visaMastercardPayment" id="visaMastercardPayment"
                               value="visaMastercardPayment" checked>
                        <label class="form-check-label" for="visaMastercardPayment">
                            Visa/Mastercard
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="discover" id="discover"
                               value="discover">
                        <label class="form-check-label" for="discover">
                            Discover
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="americanExpress" id="americanExpress"
                               value="americanExpress">
                        <label class="form-check-label" for="americanExpress">
                            American Express
                        </label>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <label for="returns-input" class="col-3 col-form-label">Return options</label>
                <div class="col-9 input-group" id="returns-input">
                    <div class="form-check">
                        <input class="form-check-input" data-toggle="collapse" data-target='#accept_hide' type="radio" name="return" value="accept" aria-expanded="false" aria-controls="collapseCheckbox" id="accept" checked>
                        <label class="form-check-label" for="accept">
                            Returns accepted
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" data-toggle="collapse" data-target='#refuse_hide' type="radio" name="return" value="refuse" aria-expanded="false" aria-controls="collapseCheckbox" id="refuse">
                        <label class="form-check-label" for="refuse">
                            No returns accepted
                        </label>
                    </div>

                    <div class="form-group col-md-4 collapse" id='accept_hide'>
                        <label for="returnDays">After receiving the item, your buyer should contact you within:</label>
                        <select id="returnDays" class="form-control">
                            <option>14 Days</option>
                            <option selected>30 Days</option>
                            <option>60 Days</option>
                        </select>
                        <label for="returnShipping">Return shipping will be paid by:</label>
                        <select id="returnShipping" class="form-control">
                            <option selected>Buyer</option>
                            <option>Auctioneer</option>
                        </select>
                    </div>
                    <div class="form-group col-md-7 collapse" id='refuse_hide'>
                        <div class="card border-warning mb-3">
                            The item could still be returned if it doesn't match the listing's description.
                        </div>
                    </div>
                </div>

            </div> --}}

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

            <div class="text-right mb-3 mt-3">
                <button type="submit" class="btn btn-primary">Save</button>
                <a type="button" class="btn btn-secondary" href="auction_asAuctioneer.html">Cancel</a>
            </div>


        </form>
        {{--


    </form>

    <h2 class="border-bottom pb-1 mb-4 mt-4 h4">Selling details</h2>
    <form>


    </form>
    <h2 class="border-bottom pb-1 mb-4 mt-4 h4">Shipping details</h2>
    <form>

        <div class="form-group row">
            <label for="location-input" class="col-3 col-form-label">Item location</label>
            <div class="col-9">
                <input class="form-control" type="text" value="Henan, China" id="location-input" required>
            </div>
        </div>

    </form>

    <form>
        <h2 class="border-bottom pb-1 mb-4 h4">Q&A</h2>

        <div class="form-group row">
            <dt class="col-sm-4 text-align-center mobile-text-center">Does it come with a fingerprint reader?</dt>
            <input class="col-sm-8 form-control" type="text" value="Nope :-)">
        </div>
        <div class="form-group row">
            <dt class="col-sm-4 text-align-center mobile-text-center">Are you able to deliver this with portuguese keyboard layout?</dt>
            <input class="col-sm-8 form-control" type="text" value="Yes we can delivery with Portuguese keyboard layout.">
        </div>
    </form>
    --}}


    </div><!-- end container -->
@endsection