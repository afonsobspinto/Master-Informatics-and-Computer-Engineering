@extends('layouts.base', ['categories' => $categories])

@section('resources')
    @parent
    <script src="{{ asset('js/auction_form.js') }}" defer></script>
    <link rel="stylesheet" href="{{ asset('css/auction_form.css') }}">

@endsection

@section('content')

    <div class="container mt-4" id="sell-section">

        <h1 class="border-bottom pb-1 mb-4 h2">Create your auction</h1>

        <form method="POST" enctype="multipart/form-data" action="{{action('AuctionController@store')}}">
            <fieldset>
                <legend hidden> Create your auction </legend>
                <h2 class="border-bottom pb-1 mb-4 h4">Product details</h2>

                <input name="_token" type="hidden" value="{{ csrf_token() }}"/>

                <div class="form-group row">
                    <label for="title-input" class="col-3 col-form-label">Title <i>*</i></label>
                    <div class="col-9">
                        <input class="form-control" type="text" placeholder="Title" id="title-input" name="title-input" required>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="category-input" class="col-3 col-form-label">Category <i>*</i></label>
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
                    <label for="description-input" class="col-3 col-form-label">Description <i>*</i></label>
                    <div class="col-9">
                        <input class="form-control" type="text" placeholder="Description" id="description-input" name="description-input" required>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="condition-input" class="col-3 col-form-label">Condition <i>*</i></label>
                    <div class="col-9">
                        <select class="form-control" id="condition-input" name="condition-input">
                            <option hidden> -</option>
                            <option>New</option>
                            <option>Used</option>
                            <option>Not Working</option>
                        </select>
                    </div>
                </div>

                @include('auctions.components.form_images', ['images' => $images ])

                <h2 class="border-bottom pb-1 mb-4 mt-4 h4">Selling details</h2>

                <div class="form-group row">
                    <label for="price-input" class="col-3 col-form-label">Starting price <i>*</i></label>
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
                    <label for="duration-input" class="col-3 col-form-label">End of auction <i>*</i></label>
                    <div class="col-9 input-group">
                        <input class="form-control" type="datetime-local" placeholder="mm/dd/yyyy, --:-- --"
                               id="duration-input" name="duration-input" required>
                    </div>
                </div>

                <h2 class="border-bottom pb-1 mb-4 mt-4 h4">Shipping details</h2>

                <div class="form-group row">
                    <label for="shippingPrice-input" class="col-3 col-form-label">Shipping Cost <i>*</i></label>
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

                <div class="form-group row">
                    <label for="city-input" class="col-3 col-form-label">Item Location <i>*</i></label>
                    <div class="col-9">
                        <select class="form-control" id="city-input" name="city" aria-describedby="City" required>
                            <option value="" {{ old('city') ? '' : 'selected' }}>All Cities</option>
                            @foreach($cities as $city)
                                <option value="{{ $city->id }}" {{ old('city') == $city->id ? 'selected' : '' }}>{{ ucfirst($city->city) }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <a>Fields with an * mean they are required to fill</a>

                <div class="text-right mb-3 mt-3">
                    <button type="submit" class="btn btn-primary sm-mb-3">List auction</button>
                    <a type="button" class="btn btn-danger sm-mb-3" href="{{ url('landing_page')}}">Cancel</a>
                </div>
            </fieldset>
        </form>


    </div>
@endsection