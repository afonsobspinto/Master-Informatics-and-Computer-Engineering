@extends('layouts.base', ['categories' => $categories])

@section('resources')
    @parent
    <link rel="stylesheet" href="{{ asset('css/auction_form.css') }}">

@endsection

@section('content')

    <div class="container mt-4" id="sell-section">

        <h1 class="border-bottom pb-1 mb-4 h2">Create your auction</h1>

        {{-- MODIFIED: enctype --}}
        <form method="POST" enctype="multipart/form-data" action="{{action('AuctionController@store')}}">
            <h2 class="border-bottom pb-1 mb-4 h4">Product details</h2>

            <input name="_token" type="hidden" value="{{ csrf_token() }}"/>

            <div class="form-group row">
                <label for="title-input" class="col-3 col-form-label">Title</label>
                <div class="col-9">
                    <input class="form-control" type="text" placeholder="Title" id="title-input" name="title-input" required>
                </div>
            </div>

            {{--<div class="form-group row">
                <label for="category-input" class="col-3 col-form-label">Category</label>
                <div class="col-9">
                    <select class="form-control" id="category-input">
                        <option hidden> -</option>
                        <option>Technology</option>
                        <option>Automobiles</option>
                        <option>Clothes</option>
                    </select>
                </div>
            </div>--}}

            <div class="form-group row">
                <label for="description-input" class="col-3 col-form-label">Description</label>
                <div class="col-9">
                    <input class="form-control" type="text" placeholder="Description" id="description-input" name="description-input" required>
                </div>
            </div>

            <div class="form-group row">
                <label for="condition-input" class="col-3 col-form-label">Condition</label>
                <div class="col-9">
                    <select class="form-control" id="condition-input" name="condition-input">
                        <option hidden> -</option>
                        <option>New</option>
                        <option>Used</option>
                        <option>Not Working</option>
                    </select>
                </div>
            </div>

            {{-- MODIFIED --}}
            {{-- Pictures --}}
            <div class="form-group row">
               <label for="photos-input" class="col-3 col-form-label">Photos</label>
               <div class="col-9">
                   <input type="file" class="form-control-file" id="photos-input" name="photos-input[]" accept="image/*" multiple>
               </div>
                @include('components.form_error_msg', ['errorName' => 'photos-input'])
            </div>
            {{-- /MODIFIED --}}

        {{--
       </form>

       <h2 class="border-bottom pb-1 mb-4 mt-4 h4">Selling details</h2>
       <form>--}}
            <div class="form-group row">
                <label for="price-input" class="col-3 col-form-label">Starting price</label>
                <div class="col-9 input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">€</span>
                    </div>
                    <input class="form-control" type="number" placeholder="Starting price"
                           aria-label="Amount (to the nearest euro)" id="price-input" name="price-input" required>
                    <div class="input-group-append">
                        <span class="input-group-text">.00</span>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <label for="duration-input" class="col-3 col-form-label">End of auction</label>
                <div class="col-9 input-group">
                    <input class="form-control" type="datetime-local" placeholder="mm/dd/yyyy, --:-- --"
                           id="duration-input" name="duration-input" required>
                </div>
            </div>

            {{--<div class="form-group row">
                <label for="payment-input" class="col-3 col-form-label">Payment options</label>
                <div class="col-9 input-group" id="payment-input" name="payment-input">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="atmPayment" id="atmPayment"
                               value="atmPayment"
                               checked>
                        <label class="form-check-label" for="atmPayment">
                            ATM Reference
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="paypalPayment" id="paypalPayment"
                               value="paypalPayment">
                        <label class="form-check-label" for="paypalPayment">
                            Paypal
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="visaMastercardPayment"
                               id="visaMastercardPayment"
                               value="visaMastercardPayment">
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
            </div>--}}

            {{--<div class="form-group row">
                <label for="returns-input" class="col-3 col-form-label">Return options</label>
                <div class="col-9 input-group" id="returns-input">
                    <div class="form-check">
                        <input class="form-check-input" data-toggle="collapse" data-target='#accept_hide' type="radio"
                               name="return" value="accept" aria-expanded="false" aria-controls="accept_hide"
                               id="accept">
                        <label class="form-check-label" for="accept">
                            Returns accepted
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" data-toggle="collapse" data-target='#refuse_hide' type="radio"
                               name="return" value="refuse" aria-expanded="false" aria-controls="refuse_hide"
                               id="refuse">
                        <label class="form-check-label" for="refuse">
                            No returns accepted
                        </label>
                    </div>

                    <div class="form-group col-md-4 collapse" id='accept_hide'>
                        <label for="returnDays">After receiving the item, your buyer should contact you within:</label>
                        <select id="returnDays" name="returnDays" class="form-control">
                            <option>14 Days</option>
                            <option selected>30 Days</option>
                            <option>60 Days</option>
                        </select>
                        <label for="returnShipping">Return shipping will be paid by:</label>
                        <select id="returnShipping" name="returnShipping" class="form-control">
                            <option selected>Buyer</option>
                            <option>Seller</option>
                        </select>
                    </div>
                    <div class="form-group col-md-7 collapse" id='refuse_hide'>
                        <div class="card border-warning mb-3">
                            The item could still be returned if it doesn't match the listing's description.
                        </div>
                    </div>
                </div>
            </div>
            {{--</form>
            <h2 class="border-bottom pb-1 mb-4 mt-4 h4">Shipping details</h2>
            <form>
                <div class="form-group row">
                    <label for="shipping-input" class="col-3 col-form-label">Shipping options</label>
                    <div class="col-9 input-group" id="shipping-input">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="domesticShipping" id="domesticShipping"
                                   value="domesticShipping">
                            <label class="form-check-label" for="domesticShipping">
                                Domestic shipping
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="internationalShipping"
                                   id="internationalShipping"
                                   value="internationalShipping">
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
                </div>--}}


            <div class="form-group row">
                <label for="shippingPrice-input" class="col-3 col-form-label">Shipping Cost</label>
                <div class="col-9 input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">€</span>
                    </div>
                    <input class="form-control" type="number" placeholder="Shipping cost"
                           aria-label="Amount (to the nearest euro)" id="shippingPrice-input" name="shippingPrice-input">
                    <div class="input-group-append">
                        <span class="input-group-text">.00</span>
                    </div>
                    <div class="form-group collapse col-12" id='calculated_option'>
                        <div class="card border">
                            Please insert the price per kg. We will use it as well with the item location to calculate
                            the shipping cost.
                        </div>
                    </div>
                </div>
            </div>

            {{--<div class="form-group row">
                <label for="location-input" class="col-3 col-form-label">Item location</label>
                <div class="col-9 input-group">
                    <select class="form-control" type="text" placeholder="Item location" id="location-input" name="location-input" required>
                        <option selected value="">All Cities</option>
                        @foreach($cities as $city)
                            <option value="{{ $city->id }}">{{ ucfirst($city->city) }}</option>
                        @endforeach
                    </select>
                </div>
            </div>--}}

            <div class="text-right mb-3 mt-3">
                <button type="submit" class="btn btn-primary sm-mb-3">List auction</button>
                <a type="button" class="btn btn-secondary sm-mb-3" href="auction/auction_preview.html">Preview</a>
                <a type="button" class="btn btn-secondary sm-mb-3" href="home/landing_page.html">Save and continue
                    later</a>
                <a type="button" class="btn btn-danger sm-mb-3" href="home/landing_page.html">Cancel</a>
            </div>
        </form>


    </div><!-- end container -->
@endsection