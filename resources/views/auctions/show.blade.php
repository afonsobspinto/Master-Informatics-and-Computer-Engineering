@extends('layouts.base', ['categories' => $categories])

@section('title', $auction->item_name)

@section('resources')
    @parent
    <link rel="stylesheet" href="{{ asset('css/auction.css') }}">
    <link rel="stylesheet" href="{{ asset('css/carousel.css') }}">
    <script src="{{ asset('js/auction.js') }}" defer></script>
@endsection

@section('content')
    <div class="row mt-5">


        <div class="col-md-9">
            <div class="row">
            </div>
            <div class="row">
                <div class="col-md-12 text-align-center mobile-text-center">

                    @include('auctions.components.auction_carousel', ['imageURLs' => $auction->getImagesURLs()])
                    <span class="display-4 title">{{ $auction->item_name }}</span>
                    <span class="badge badge-primary">{{ $auction->getCategoryName() }}</span>
                    <span class="badge badge-info">{{ $auction->condition }}</span>
                    @if(!Auth::check() || Auth::user()->isAdmin() || Auth::user()->isBanned() || Auth::user()->isAuctionOwner($auction) || $auction->isClosed())
                    @elseif(Auth::user()->itemOnWishlist($auction))
                        <form method="POST" action="{{action('AuctionController@removeFromWishlist', [$auction->id])}}">
                            {{ csrf_field() }}
                            <label for="wishlist-button" class="col-form-label"></label>
                            <button type="submit" id="wishlist-button" class="fas fa-star text-warning " style="border:none;" title="Remove from Wishlist"></button>
                        </form>
                    @else
                        <form method="POST" action="{{action('AuctionController@addToWishlist', [$auction->id])}}">
                            {{ csrf_field() }}
                            <button type="submit" id="wishlist-button" class="far fa-star text-warning " style="border:none;" title="Add to Wishlist"></button>
                        </form>

                    @endif
                </div>
            </div><!-- end row-->
        </div>

        {{-- auction owner 'card' --}}
        <div class="col-md-3 ">
            <div class="card text-align-center mobile-text-center" style="width: 20rem;">
                <img class="card-img-top img-fluid" src="{{ $auction->getUserPicture($auction->owner_id) }}"
                     alt="Auctioneer Image" title="{{ $auction->getAuctionOwner() }}">


                <div class="card-block mb-3">
                    <h4 class="card-title"><a href="{{ url('profile/' . $auction->owner_id)  }}">{{ $auction->getAuctionOwner() }}</a></h4>
                    @if($auction->getAuctionOwnerRating() > 0.5)
                        <span class="fas fa-star" aria-hidden="true"></span>
                    @else
                        <span class="far fa-star" aria-hidden="true"></span>
                    @endif
                    @if($auction->getAuctionOwnerRating() > 1.5)
                        <span class="fas fa-star" aria-hidden="true"></span>
                    @else
                        <span class="far fa-star" aria-hidden="true"></span>
                    @endif
                    @if($auction->getAuctionOwnerRating() > 2.5)
                        <span class="fas fa-star" aria-hidden="true"></span>
                    @else
                        <span class="far fa-star" aria-hidden="true"></span>
                    @endif
                    @if($auction->getAuctionOwnerRating() > 3.5)
                        <span class="fas fa-star" aria-hidden="true"></span>
                    @else
                        <span class="far fa-star" aria-hidden="true"></span>
                    @endif
                    @if($auction->getAuctionOwnerRating() > 4.5)
                        <span class="fas fa-star" aria-hidden="true"></span>
                    @else
                        <span class="far fa-star" aria-hidden="true"></span>
                    @endif
                    <span class="badge badge-success">{{ $auction->getAuctionOwnerRating() * 100 / 5 }}</span>
                    <p class="card-text">{{ $auction->getAuctionOwnerEmail() }}</p>

                @if(Auth::check())
                @if(Auth::user()->isBanned())
                @elseif(Auth::user()->isAuctionOwner($auction))
                <a href="/auctions/{{$auction->id}}/edit" class="btn btn-primary ">Edit Auction</a>
                <a href="#" class="btn btn-danger" data-toggle="modal" data-target="#removeModal">Remove Auction</a>
                {{-- delete auction modal --}}
                <div class="modal fade" id="removeModal" tabindex="-1" role="dialog"
                     aria-labelledby="removeModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="removeModalLabel">Remove Auction </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <label for="user-pass" class="col-form-label">Password:</label>
                                    <input type="password" class="form-control" id="user-pass" name="password">
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                        data-dismiss="modal">Close
                                </button>
                                <button id="remove-auction-btn" type="button" class="btn btn-danger report" data-dismiss="modal">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
                @else
                <a href="/contact/{{ App\User::find($auction->owner_id)->username}}/{{$auction->id}}" id = "sendbtn" type="button" class="btn btn-success "> Contact </a>
                <div class="modal fade" id="contactModal" tabindex="-1" role="dialog"
                     aria-labelledby="contactModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="contactModalLabel">New message</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label for="recipient-name" class="form-control-label">To:</label>
                                        <input type="text" class="form-control" id="dest-name">
                                    </div>
                                    <div class="form-group">
                                        <label for="item-name" class="form-control-label">#Item:</label>
                                        <input type="text" class="form-control" id="item-name">
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="form-control-label">Message:</label>
                                        <textarea class="form-control" id="contact-text"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" id="closebtn" class="btn btn-secondary"
                                        data-dismiss="modal">Close
                                </button>
                                <button type="button" id="sendbtn"
                                        class="btn btn-primary">Send message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                More Options
                            </button>
                            @if(Auth::user()->isAdmin())
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" data-toggle="modal" data-target="#banModal">Ban account</a>
                                </div>
                            @else
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" data-toggle="modal"
                                       data-target="#exampleModal">Report Account</a>
                                </div>
                                <form action="{{route('reports.storeReport')}}" method="POST" id="userReport" class="userReport">
                                    {{csrf_field() }}
                                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Report User Name's Account </h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="form-group">
                                                        <div>
                                                            <h5 style="color:brown"> Motive</h5>
                                                            <div class="radio">
                                                                <label><input id="5" type="radio" name="radio1" value="Abusive behaviour"> Abusive behaviour </label>
                                                            </div>
                                                            <div class="radio">
                                                                <label><input id="6" type="radio" name="radio1" value="Inappropriate content in profile">Inappropriate content in profile </label>
                                                            </div>
                                                            <div class="radio">
                                                                <label><input id="7" type="radio" name="radio1" value="Didn't receive an item">Didn't receive an item</label>
                                                            </div>
                                                            <div class="radio">
                                                                <label><input id="8" type="radio" name="radio1" value="FUCK OFF">Other</label>
                                                            </div>
                                                        </div>
                                                        <label for="reason" class="col-form-label">Other:</label>
                                                        <input type="text" class="form-control" id="reason1">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="message-text" class="col-form-label">Message:</label>
                                                        <textarea class="form-control" id="message-text"></textarea>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                            data-dismiss="modal">Close
                                                    </button>
                                                    <button type="submit" id="report" class="btn btn-primary report">Report</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            @endif
                        @endif
                    @endif
                </div>
            </div>
        </div>
    </div>

    <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
        <ul class="nav nav-tabs">
            <li class="nav-item" class="active">
                <a class="nav-link active" id="details-tab" data-toggle="tab" href="#details" role="tab"
                   aria-controls="details" aria-selected="true">Bid Details</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="shippingAndPayment-tab" data-toggle="tab" href="#shippingAndPayment" role="tab"
                   aria-controls="shippingAndPayment" aria-selected="true">Shipping and Payment</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="qa-tab" data-toggle="tab" href="#qa" role="tab" aria-controls="qa"
                   aria-selected="true">Q&A</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="review-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews"
                   aria-selected="true">Auctioneer Reviews</a>
            </li>
        </ul>
        @if(!Auth::check() || Auth::user()->isBanned() || Auth::user()->isAuctionOwner($auction))
        @elseif(Auth::user()->isAdmin())
            <span>
        <a href="#" class="badge badge-danger" data-toggle="modal" data-target="#cancelModal">Cancel Auction</a>
            </span>
        @else
            <button type="button" class="btn btn-danger btn-sm report" data-toggle="modal" data-target="#exampleModal1">
                Report Item
            </button>
            <form action="{{route('reports.store')}}" method="POST" id="userForm" class="userForm">
                {{csrf_field() }}
                <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"> Report Name's Item</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <div>
                                            <h5 style="color:brown"> Motive</h5>
                                            <label><input id="1" type="radio" name="radio" value="Received a counterfeit or fake item"> Received a counterfeit or fake item</label>
                                            <div class="radio">
                                                <label><input id="2" type="radio" name="radio" value="This item is illegal"> This item is illegal</label>
                                            </div>
                                            <div class="radio">
                                                <label><input id="3" type="radio" name="radio" value="Received item is not in the original condition">Received item is not in the original condition</label>
                                            </div>
                                            <div class="radio">
                                                <label><input id="4" type="radio" name="radio" value="FUCK OFF">Other</label>
                                            </div>
                                        </div>
                                        <label for="reason" class="col-form-label">Other:</label>
                                        <input type="text" class="form-control" id="reason">
                                        <input type = "hidden" value="{{$auction->id}}" id="auction">
                                        <input type = "hidden" value="{{Auth::user()->id}}" id="reporter">
                                    </div>
                                    <div class="form-group">
                                        <label for="message" class="col-form-label">Message:</label>
                                        <textarea class="form-control" id="message"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" id= "sub" class="btn btn-primary">Send message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        @endif
    </nav>

    <!-- Tab panes -->
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="details" role="tabpanel" aria-labelledby="details-tab">
            <dl class="row">
                @if(!Auth::check())
                    <dt class="col-sm-2 text-align-center mobile-text-center">Current Bid</dt>
                @elseif(Auth::user()->isHighestBidder($auction))
                    <dt class="col-sm-2 text-align-center mobile-text-center">Current Bid <i class="fas fa-circle"
                                                                                             title="You are currently the winner bid"></i>
                    </dt>
                @else
                    <dt class="col-sm-2 text-align-center mobile-text-center">Current Bid</dt>
                @endif
                @if($auction->isWon())
                    <dd class="col-sm-10" id="current-auction-price-won">{{ $auction->currentPriceEuros()}}€ (Won
                        by <a href="../profile/{{$auction->getAuctionWinner($auction->id)}}">{{ $auction->getAuctionWinnerName($auction->id) }} </a> )</dd>
                @else
                    <dd class="col-sm-10" id="current-auction-price">{{ $auction->currentPriceEuros()}}€ </dd>
                @endif



                    <dt class="col-sm-2 text-align-center mobile-text-center">Time Left</dt>
                    @if(!$auction->isClosed())
                        <dd class="col-sm-10">Ending in {{ $auction->getTimeLeftString() }}</dd>
                    @else
                        <dd class="col-sm-10">Auction Closed</dd>
                    @endif

                    <dt class="col-sm-2 text-align-center mobile-text-center">Description</dt>
                    <dd class="col-sm-10">{{ $auction->description }}</dd>

                    @if(!Auth::check() || Auth::user()->isAdmin() || Auth::user()->isBanned() || Auth::user()->isAuctionOwner($auction) || $auction->isClosed())
                    @else
                        <form method="POST" action="{{action('AuctionController@storeBid', [$auction->id])}}">
                            {{ csrf_field() }}
                            <dt class="col-sm-8 bid text-align-center mobile-text-center" id="input-bid">
                                <div class="input-group mb-3">
                                    @if(Auth::user()->isHighestBidder($auction))
                                    @else
                                        <label for="bid-amount" class="col-3 col-form-label" hidden>Bid amount</label>
                                        <input type="number" class="form-control" id="bid-amount" name="bid-amount"
                                               required>
                                        <div class="input-group-append">
                                            <span class="input-group-text">€</span>
                                        </div>
                                        <div class="col-sm-3 bid" id="button-bid">
                                            <div class="btn-group">
                                                <input type="submit" name="submit" value="Place Bid" class="btn"
                                                       id="button-bid">
                                            </div>
                                        </div>
                                </div>
                            </dt>
                            @endif
                        </form>
                    @endif
            </dl>
        </div>
        <div class="tab-pane fade" id="shippingAndPayment" role="tabpanel" aria-labelledby="shippingAndPayment-tab">
            <dl class="row">
                <dt class="col-sm-2 text-align-center mobile-text-center">Shipping</dt>
                <dd class="col-sm-10">{{ $auction->shipping_options }}</dd>

                <dt class="col-sm-2 text-align-center mobile-text-center">Shipping Cost</dt>
                <dd class="col-sm-10">{{ $auction->shipping_cost }}€</dd>

                <dt class="col-sm-2 text-align-center mobile-text-center">Item location</dt>
                <dd class="col-sm-10">{{ $auction->getCityName() }}</dd>

                <dt class="col-sm-2 text-align-center mobile-text-center">Payments</dt>
                <dd class="col-sm-10">{{ $auction->payment_type }}</dd>
            </dl>
        </div>
        <div class="tab-pane fade" id="qa" role="tabpanel" aria-labelledby="qa-tab">
            <dl class="row">
                @if(count($qas) == 0)
                    <p>No questions yet, ask something!</p>
                @else
                    @foreach($qas as $qa)
                        <dt class="col-sm-8 mobile-text-center">{{ $qa->question }}?</dt>
                       @if($qa->answer === NULL)
                           @if(Auth::user()->isAuctionOwner($auction))
                                <form method="POST" action="{{action('AuctionController@storeAnswer', [$auction->id, $qa->id])}}">
                                    {{ csrf_field() }}
                                    <div class="input-group mb-3 col-sm-16">
                                        <label for="answer-input" class="col-3 col-form-label" hidden>Answer</label>
                                        <input type="text" class="form-control" placeholder="Place your answer" id="answer-input" name="answer-input" required>
                                        <div class="input-group-append" id="answer-id">
                                            <input type="submit" name="submit" value="Answer" class="btn btn-outline-secondary" id="answer-id">
                                        </div>
                                    </div>
                                </form>
                            @else
                               <font color="red">This question hasn't been answer yet!</font>
                            @endif
                        @else
                            <dd class="col-sm-8">{{ $qa->answer }}</dd>
                        @endif
                    @endforeach
                @endif
            </dl>
            @if(!Auth::check() || Auth::user()->isAdmin() || Auth::user()->isBanned() || Auth::user()->isAuctionOwner($auction) || $auction->isClosed())
            @else
                <form method="POST" action="{{action('AuctionController@storeQuestion', [$auction->id])}}">
                    {{ csrf_field() }}
                <div class="input-group mb-3 col-sm-10">
                    <label for="question-input" class="col-3 col-form-label" hidden>Question</label>
                    <input type="text" class="form-control" placeholder="Place your question" id="question-input" name="question-input" required>
                    <div class="input-group-append" id="question-id">
                        <input type="submit" name="submit" value="Ask" class="btn btn-outline-secondary" id="question-id">
                    </div>

                </div>
                </form>
            @endif
        </div>

        <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
            <div class="review-block">
                @if(count($reviews) == 0)
                    <p>This auctioneer has no reviews yet!</p>
                @else
                    @foreach($reviews as $review)
                        <div class="row">
                            <div class="col-sm-2 text-align-center mobile-text-center">
                                <img src="{{ $auction->getUserPicture($auction->getAuctionWinner($review->id)) }} "
                                     class="img-review img-fluid" alt="Auction Winner" title="{{ $auction->getAuctionWinnerName($review->id) }}">
                                <div class="review-block-name"><a href="{{ url('profile/' . $auction->getAuctionWinner($review->id))  }}">{{ $auction->getAuctionWinnerName($review->id) }}</a></div>
                            </div>
                            <div class="col-sm-10 ">
                                <div class="review-block-rate">
                                    @if($review->rating > 0.5)
                                        <span class="fas fa-star" aria-hidden="true"></span>
                                    @else
                                        <span class="far fa-star" aria-hidden="true"></span>
                                    @endif
                                    @if($review->rating > 1.5)
                                        <span class="fas fa-star" aria-hidden="true"></span>
                                    @else
                                        <span class="far fa-star" aria-hidden="true"></span>
                                    @endif
                                    @if($review->rating > 2.5)
                                        <span class="fas fa-star" aria-hidden="true"></span>
                                    @else
                                        <span class="far fa-star" aria-hidden="true"></span>
                                    @endif
                                    @if($review->rating > 3.5)
                                        <span class="fas fa-star" aria-hidden="true"></span>
                                    @else
                                        <span class="far fa-star" aria-hidden="true"></span>
                                    @endif
                                    @if($review->rating > 4.5)
                                        <span class="fas fa-star" aria-hidden="true"></span>
                                    @else
                                        <span class="far fa-star" aria-hidden="true"></span>
                                    @endif
                                </div>
                                <div class="review-block">{{ $review->review_text }}</div>
                                @if(!Auth::check() || Auth::user()->isAdmin() || Auth::user()->isBanned())
                                @else
                                    <a class="badge badge-light report" type="button" data-toggle="modal"
                                       href="#exampleModal">
                                        Report abuse
                                    </a>
                                @endif
                            </div>
                        </div>
                    @endforeach
                @endif
            </div>
        </div>
        <div class="modal fade" id="cancelModal" tabindex="-1" role="dialog"
             aria-labelledby="cancelModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cancelModalLabel">Remove Content </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <div>
                                    <h5 style="color:brown"> Motive</h5>
                                    <div class="radio">
                                        <label><input type="radio"
                                                      name="behaviour"> Abusive behaviour </label>
                                    </div>
                                    <div class="radio">
                                        <label><input type="radio" name="content"> Spam </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Message:</label>
                                <textarea class="form-control" id="message-text"></textarea>
                            </div>
                            <label for="admin-pass" class="col-form-label">Password:</label>
                            <input type="password" class="form-control" id="admin-pass">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                                data-dismiss="modal">Close
                        </button>
                        <button type="button" class="btn btn-danger report">Remove</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="banModal" tabindex="-1" role="dialog"
             aria-labelledby="banModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="banModalLabel">Ban Account </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <div>
                                    <h5 style="color:brown"> Motive</h5>
                                    <div class="radio">
                                        <label><input type="radio"
                                                      name="behaviour">Abusive behaviour</label>
                                    </div>
                                    <div class="radio">
                                        <label><input type="radio" name="content">Spam</label>
                                    </div>
                                    <div class="radio">
                                        <label><input type="radio" name="content">Troll</label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="ban_duration" class="col-form-label">Ban Duration:</label>
                                <span>
                                <input type="date" class="form-control mb-2" name="duration" id="ban_duration">
                                </span>

                                <span class="radio">
                                    <label><input type="radio" name="duration">Permanent</label>
                            </span>

                            </div>
                            <div class="form-group">
                                <label for="message-text_ban" class="col-form-label">Message:</label>
                                <textarea class="form-control" id="message-text_ban"></textarea>
                            </div>
                            <label for="admin-pass_ban" class="col-form-label">Password:</label>
                            <input type="password" class="form-control" id="admin-pass_ban">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger report">Ban Account</button>
                        <button type="button" class="btn btn-secondary"
                                data-dismiss="modal">Close
                        </button>

                    </div>
                </div>
            </div>
        </div>
        @if(!Auth::check())
            <div class="alert alert-danger" role="alert">
                <strong>Hey you! </strong> Regist in our website to enjoy our full experience!
            </div>
        @elseif(Auth::user()->isBanned())
            <div class="alert alert-danger" role="alert">
                <strong>Oh snap! </strong> It seems like you are banned. You can't fully enjoy our awesome website until 6 March 2022.
            </div>
        @endif
    </div>

    <script>
        $("#sub").click(function(e){
            e.preventDefault();
            var $form = $("#userForm");
            console.log ("NAO GOSTO DISTO " );
            if (document.getElementById("1").checked) {
                var rate_value = document.getElementById("1").value;
            } else if (document.getElementById("2").checked){
                var rate_value = document.getElementById("2").value;
            } else if(document.getElementById("3").checked) {
                var rate_value = document.getElementById("3").value;
            } else if (document.getElementById("4").checked){
                var rate_value = $("#reason").val();
            }
            var message = $("#message").val();
            var url = window.location.href;
            var auctionID=url.split("/").pop();
            var userId = $("#reporter").val();
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: {msg: message, sub:rate_value, user_id: userId, auction_id: auctionID, is_user: false, },
                success: function (data) {
                    if(data.error){
                        return;
                    }
                    alert(data.success); // THis is success message
                    $('#exampleModal').modal('hide');  // Your modal Id
                    window.location.reload(true);
                },
                error: function () {
                }
            });
        });
    </script>



    <script>
        $("#report").click(function(e){
            e.preventDefault();
            var $form = $("#userReport");
            if (document.getElementById("5").checked) {
                var value = document.getElementById("5").value;
            } else if (document.getElementById("6").checked){
                var value = document.getElementById("6").value;
            } else if(document.getElementById("7").checked) {
                var value = document.getElementById("7").value;
            } else if (document.getElementById("8").checked){
                var value = $("#reason1").val();
            }
            var message = $("#message-text").val();
            var url = window.location.href;
            var reportedUser = 5;                                                         //MUDAR ISTO
            var userId = $("#reporter").val();
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: {msg: message, sub:value, user_id: userId, reported_user: reportedUser, is_user: true, },
                success: function (data) {
                    if(data.error){
                        return;
                    }
                    alert(data.success); // THis is success message
                    $('#exampleModal').modal('hide');  // Your modal Id
                    window.location.reload(true);
                },
                error: function (result) {
                }
            });
        });
    </script>
@endsection