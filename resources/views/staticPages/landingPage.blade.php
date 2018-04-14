@extends('layouts.base')

@section('title', 'Home')

@section('resources')
    @parent
    <link rel="stylesheet" href="{{ asset('css/landing_page.css') }}">
@endsection

@section('content')
    <!-- auctions carousel -->
    <!-- these could be just random auctions in the system -->
    <div id="carouselAuctions" class="carousel slide mt-4 mx-auto" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <!-- carousel items here, change <img> <a> and the subtitle <h3> and <p> with appropriate data -->
                <a href="../auction/auction.html">
                    <img class="d-block " src="https://placeimg.com/1600/900/tech" alt="First slide">
                    <div class="carousel-caption d-md-block">
                        <h3>Another Newish Item</h3>
                        <h4><strong class="display-4">15€</strong></h4>
                        <h5>5 bids</h5>
                    </div>
                </a>
            </div>
            <div class="carousel-item">
                <a href="../auction/auction.html">
                    <img class="d-block " src="https://placeimg.com/480/480/arch" alt="Second slide">
                    <div class="carousel-caption d-md-block">
                        <h3>Another Newish Item</h3>
                        <h4><strong class="display-4">15€</strong></h4>
                        <h5>5 bids</h5>
                    </div>
                </a>
            </div>
            <div class="carousel-item">
                <a href="../auction/auction.html">
                    <img class="d-block " src="https://placeimg.com/400/300/arch" alt="Second slide">
                    <div class="carousel-caption d-md-block">
                        <h3>Another Newish Item</h3>
                        <h4><strong class="display-4">15€</strong></h4>
                        <h5>5 bids</h5>
                    </div>
                </a>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselAuctions" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselAuctions" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>

    <!-- Recent Auctions Grid -->
    <!-- can be the 6 most recent -->
    <div class="container mt-5 auction-grid">
        <h3 class="border-bottom mb-3">Most Recent Auctions: </h3>
        <div class="card-columns">
            <!-- reference to auction here -->
            <div class="card border-info">
                <a href="../auction/auction.html">
                    <!-- place auction data here -->
                    <!-- images can be any size -->
                    <img class="card-img-top" src="https://placeimg.com/640/640/tech" alt="auction image">
                    <div class="card-body">
                        <h3 class="card-title">Red Toyota car</h3>
                        <p class="card-subtitle mb-2 text-muted"><strong class="display-4">10€</strong> 5 bids</p>
                        <p class="card-text">The fastest car around, the 10 year old toyota legend which still holds
                            numerous records ...</p>
                        <p class="card-text">
                            <small class="text-muted">Submitted 5 mins ago</small>
                        </p>
                    </div>
                </a>
            </div>
            <div class="card border-info">
                <a href="../auction/auction.html">
                    <img class="card-img-top" src="https://placeimg.com/960/480/tech" alt="auction image">
                    <div class="card-body">
                        <h3 class="card-title">Grey Camera</h3>
                        <p class="card-subtitle mb-2 text-muted"><strong class="display-4">10€</strong> 5 bids</p>
                        <p class="card-text">Description: maybe the first 10 or 20 words ...</p>
                        <p class="card-text">
                            <small class="text-muted">Submitted 5 mins ago</small>
                        </p>
                    </div>
                </a>
            </div>
            <div class="card border-info">
                <a href="../auction/auction.html">
                    <img class="card-img-top" src="https://placeimg.com/480/640/nature" alt="auction image">
                    <div class="card-body">
                        <h3 class="card-title">Samsung Tablet</h3>
                        <p class="card-subtitle mb-2 text-muted"><strong class="display-4">10€</strong> 5 bids</p>
                        <p class="card-text">Description: maybe the first 10 or 20 words ...</p>
                        <p class="card-text">
                            <small class="text-muted">Submitted 5 mins ago</small>
                        </p>
                    </div>
                </a>
            </div>
            <div class="card border-info">
                <a href="../auction/auction.html">
                    <img class="card-img-top" src="https://placeimg.com/480/480/arch" alt="auction image">
                    <div class="card-body">
                        <h3 class="card-title">Pixel X2 4GB</h3>
                        <p class="card-subtitle mb-2 text-muted"><strong class="display-4">10€</strong> 5 bids</p>
                        <p class="card-text">Description: maybe the first 10 or 20 words ...</p>
                        <p class="card-text">
                            <small class="text-muted">Submitted 5 mins ago</small>
                        </p>
                    </div>
                </a>
            </div>
            <div class="card border-info">
                <a href="../auction/auction.html">
                    <img class="card-img-top" src="https://placeimg.com/480/300/tech" alt="auction image">
                    <div class="card-body">
                        <h3 class="card-title">toyota motorcycle</h3>
                        <p class="card-subtitle mb-2 text-muted"><strong class="display-4">10€</strong> 5 bids</p>
                        <p class="card-text">Description: maybe the first 10 or 20 words ...</p>
                        <p class="card-text">
                            <small class="text-muted">Submitted 5 mins ago</small>
                        </p>
                    </div>
                </a>
            </div>
            <div class="card border-info">
                <a href="../auction/auction.html">
                    <img class="card-img-top" src="https://placeimg.com/480/640/arch" alt="auction image">
                    <div class="card-body">
                        <h3 class="card-title">some other new item</h3>
                        <p class="card-subtitle mb-2 text-muted"><strong class="display-4">10€</strong> 5 bids</p>
                        <p class="card-text">Description: maybe the first 10 or 20 words ...</p>
                        <p class="card-text">
                            <small class="text-muted">Submitted 5 mins ago</small>
                        </p>
                    </div>
                </a>
            </div>
        </div>
    </div>

    <!-- Ending soon Auctions Grid -->
    <!-- can be 4 that are ending soon -->
    <div class="container mt-5 auction-grid">
        <h3 class="border-bottom mb-3">Ending Soon: </h3>
        <div class="card-columns">
            <!-- reference to auction here -->
            <div class="card border-info">
                <a href="../auction/auction.html">
                    <!-- place auction data here -->
                    <!-- images can be any size -->
                    <img class="card-img-top" src="https://placeimg.com/640/640/tech" alt="auction image">
                    <div class="card-body">
                        <h3 class="card-title">brand new headphones</h3>
                        <p class="card-subtitle mb-2 text-muted"><strong class="display-4">10€</strong> 5 bids</p>
                        <p class="card-text">A brand new headphone, only for the low low price of 5001$</p>
                        <p class="card-text">
                            <small class="text-muted">Ending in 15 mins</small>
                        </p>
                    </div>
                </a>
            </div>
            <div class="card border-info">
                <a href="../auction/auction.html">
                    <img class="card-img-top" src="https://placeimg.com/960/480/tech" alt="auction image">
                    <div class="card-body">
                        <h3 class="card-title">some item</h3>
                        <p class="card-subtitle mb-2 text-muted"><strong class="display-4">10€</strong> 5 bids</p>
                        <p class="card-text">Description: maybe the first 10 or 20 words ...</p>
                        <p class="card-text">
                            <small class="text-muted">Ending in 15 mins</small>
                        </p>
                    </div>
                </a>
            </div>
            <div class="card border-info">
                <a href="../auction/auction.html">
                    <img class="card-img-top" src="https://placeimg.com/480/640/nature" alt="auction image">
                    <div class="card-body">
                        <h3 class="card-title">some item</h3>
                        <p class="card-subtitle mb-2 text-muted"><strong class="display-4">10€</strong> 5 bids</p>
                        <p class="card-text">Description: maybe the first 10 or 20 words ...</p>
                        <p class="card-text">
                            <small class="text-muted">Ending in 15 mins</small>
                        </p>
                    </div>
                </a>
            </div>
            <div class="card border-info">
                <a href="../auction/auction.html">
                    <img class="card-img-top" src="https://placeimg.com/480/480/arch" alt="auction image">
                    <div class="card-body">
                        <h3 class="card-title">some item</h3>
                        <p class="card-subtitle mb-2 text-muted"><strong class="display-4">10€</strong> 5 bids</p>
                        <p class="card-text">Description: maybe the first 10 or 20 words ...</p>
                        <p class="card-text">
                            <small class="text-muted">Ending in 15 mins</small>
                        </p>
                    </div>
                </a>
            </div>
            <div class="card border-info">
                <a href="../auction/auction.html">
                    <img class="card-img-top" src="https://placeimg.com/480/300/tech" alt="auction image">
                    <div class="card-body">
                        <h3 class="card-title">some item</h3>
                        <p class="card-subtitle mb-2 text-muted"><strong class="display-4">10€</strong> 5 bids</p>
                        <p class="card-text">Description: maybe the first 10 or 20 words ...</p>
                        <p class="card-text">
                            <small class="text-muted">Ending in 15 mins</small>
                        </p>
                    </div>
                </a>
            </div>
            <div class="card border-info">
                <a href="../auction/auction.html">
                    <img class="card-img-top" src="https://placeimg.com/480/640/arch" alt="auction image">
                    <div class="card-body">
                        <h3 class="card-title">some item</h3>
                        <p class="card-subtitle mb-2 text-muted"><strong class="display-4">10€</strong> 5 bids</p>
                        <p class="card-text">Description: maybe the first 10 or 20 words ...</p>
                        <p class="card-text">
                            <small class="text-muted">Ending in 15 mins</small>
                        </p>
                    </div>
                </a>
            </div>
        </div>
    </div>

    </div>
@endsection
