@extends('layouts.base', ['categories' => $categories, 'countries' => $countries, 'user' => $user])

@section('resources')
    @parent
    <link rel="stylesheet" href="{{ asset('css/profile.css') }}">
@endsection

@section('content')

<!-- profile -->
<div class="container" id="product-section">
    <div class="row">
        <div class="col-md-3">

        </div>
        <div class="col-md-3">
            <img src="{{ $profile_picture }}"
                 alt="Picture" style="width:100%">
        </div>
        <div class="col-md-3">
            <div class="row">
                <h1>{{ $user->username }}</h1>
            </div>
            <div class="row">
                <p>{{ $user->getCountryName() }}</p>
            </div>
            <div class="row">
                <p class="email">{{ $user->email }}</p>
            </div>
            @if(((Auth::user()->isAdmin() || (Auth::user()->isBanned())) && Auth::user()->isProfileOwner($user))
            || Auth::user()->isUserBanned($user) || Auth::user()->isUserAdmin($user))
            @elseif(Auth::check())
                <div class="row">
                    @if($user->rating > 0.5)
                        <span class="fas fa-star" aria-hidden="true"></span>
                    @else
                        <span class="far fa-star" aria-hidden="true"></span>
                    @endif
                    @if($user->rating > 1.5)
                        <span class="fas fa-star" aria-hidden="true"></span>
                    @else
                        <span class="far fa-star" aria-hidden="true"></span>
                    @endif
                    @if($user->rating > 2.5)
                        <span class="fas fa-star" aria-hidden="true"></span>
                    @else
                        <span class="far fa-star" aria-hidden="true"></span>
                    @endif
                    @if($user->rating > 3.5)
                        <span class="fas fa-star" aria-hidden="true"></span>
                    @else
                        <span class="far fa-star" aria-hidden="true"></span>
                    @endif
                    @if($user->rating > 4.5)
                        <span class="fas fa-star" aria-hidden="true"></span>
                    @else
                        <span class="far fa-star" aria-hidden="true"></span>
                    @endif
                    <span class="badge badge-success">{{ $user->rating * 100 / 5 }}</span>
                </div>
            @endif
            @if(Auth::check())
                    @if(Auth::user()->isBanned() && Auth::user()->isProfileOwner($user))
                    <div class="row">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#appealModal"
                                data-whatever="@getbootstrap"> Appeal Ban
                        </button>
                    </div>
                    <div class="modal fade" id="appealModal" tabindex="-1" role="dialog"
                         aria-labelledby="appealModal" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="contactModalLabel">Appeal Ban</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <label class="form-control-label">Message:</label>
                                            <textarea class="form-control" id="appeal-text"></textarea>
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
                    <p></p>
                    <div class="row">
                        <p>14 days until ban ends</p>
                    </div>
                    @elseif(Auth::user()->isAdmin() && Auth::user()->isUserBanned($user))
                    <div class="row">
                        <a href="#" class="btn btn-primary " data-toggle="collapse" data-target=".collapseAlert" >Unban User</a>
                    </div>
                    <div class="collapse collapseAlert">
                        <div class="alert alert-success" role="alert">
                            <strong>Done!</strong> You successfully unbanned this user!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#changeModal"
                                data-whatever="@getbootstrap"> Change Ban Duration
                        </button>
                    </div>
                    <div class="modal fade" id="changeModal" tabindex="-1" role="dialog"
                         aria-labelledby="changeModal" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="contactModalLabel">Change Ban Duration</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <label for="ban_duration" class="col-form-label">Ban Duration:</label>
                                            <span>
                                        <input type="date" class="form-control mb-2" name="duration" id="ban_duration">
                                    </span>
                                            <span class="radio">
                                        <label><input type="radio" name="duration">Permanent</label>
                                    </span>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" id="closebtn" class="btn btn-secondary"
                                            data-dismiss="modal">Close
                                    </button>
                                    <button type="button" id="sendbtn"
                                            class="btn btn-primary">Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    @elseif(Auth::user()->isUserBanned($user))
                    @elseif(Auth::user()->isProfileOwner($user))
                        <div class="row">
                            <a href="{{ url('profile/' . Auth::user()->id . '/edit')  }}" class="btn btn-primary ">Edit Profile</a>
                        </div>
                        <div class="row">
                            <a href="#" class="btn btn-danger" data-toggle="modal" data-target="#cancelModal">Cancel Account</a>
                        </div>
                    @elseif(Auth::user()->isAdmin() && Auth::user()->isUserAdmin($user))
                    <div class="row" id="voteDemote">
                        <a href="#" class="btn btn-danger " data-toggle="collapse" data-target=".collapseAlert">Vote to demote Admin</a>
                    </div>
                    <div class="collapse collapseAlert">
                        <div class="alert alert-success" role="alert">
                            <strong>Done!</strong> You voted to demote this Admin
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    @elseif(Auth::user()->isAdmin())
                    <div class="row">
                        <a href="#" class="btn btn-primary " data-toggle="collapse" data-target=".collapseAlert">Promote to Admin</a>
                    </div>
                    <div class="collapse collapseAlert">
                        <div class="alert alert-success" role="alert">
                            <strong>Done!</strong> You promoted this user to Admin
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <a href="#" class="btn btn-danger " data-toggle="modal" data-target="#banModal">Ban User</a>
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
                    @elseif(!Auth::user()->isBanned())
                        <div class="row">
                            <a class="badge badge-light report" type="button" data-toggle="modal"
                               href="#exampleModal">
                                Report abuse
                            </a>
                        </div>
                    @endif
                        <p></p>
            @if((Auth::user()->isUserAdmin($user)) && (!Auth::user()->isProfileOwner($user)))
                <p style="color:red;">This user is an administrator!</p>
            @elseif((Auth::user()->isUserBanned($user)) && (!Auth::user()->isProfileOwner($user)))
                <p style="color:red;">This user is banned!</p>
            @endif
            @endif
        </div>

        @if((Auth::user()->isAdmin() || (Auth::user()->isBanned())) && Auth::user()->isProfileOwner($user))
        @elseif((Auth::user()->isUserAdmin($user)) || (Auth::user()->isUserBanned($user)))
        @elseif(Auth::check())
        <!-- Nav tabs -->
        <ul class="nav nav-tabs">
            <li class="active">
                <a class="nav-link active" id="feedback-tab" data-toggle="tab" href="#feedback" role="tab" aria-controls="feedback" aria-selected="true">Feedback</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="itemsForSale-tab" data-toggle="tab" href="#itemsForSale" role="tab" aria-controls="itemsForSale" aria-selected="true">Items for Sale</a>
            </li>
                @if(Auth::user()->isProfileOwner($user))
                    <li class="nav-item">
                        <a class="nav-link" id="watchList-tab" data-toggle="tab" href="#watchList" role="tab" aria-controls="watchList" aria-selected="true">Wishlist</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="biddingItems-tab" data-toggle="tab" href="#biddingItems" role="tab" aria-controls="biddingItems" aria-selected="true">Items I'm bidding</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="purchaseHistory-tab" data-toggle="tab" href="#purchaseHistory" role="tab" aria-controls="purchaseHistory" aria-selected="true">
                            Purchase History
                            <i class="fas fa-exclamation" aria-hidden="true" title="Item(s) waiting for Feedback"></i>
                        </a>
                    </li>
                @endif
            @endif
        </ul>

        @if((Auth::user()->isAdmin() || (Auth::user()->isBanned())) && Auth::user()->isProfileOwner($user))
        @elseif((Auth::user()->isUserAdmin($user)) || (Auth::user()->isUserBanned($user)))
        @else
        <!-- Tab panes -->
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="feedback" role="tabpanel" aria-labelledby="feedback-tab">
                @if(count($feedback) == 0)
                    <p>No one reviewed this user's amazing work yet!</p>
                @else
                @foreach($feedback as $review)
                <div class="review-block">
                    <div class="row">
                        <div class="col-sm-3">
                            <img src="http://interactive.nydailynews.com/2016/05/simpsons-quiz/img/simp1.jpg" class="img-review img-fluid">
                            <div class="review-block-name"><a href="{{ url('profile/' . $user->getAuctionWinner($review->id))  }}">{{ $user->getAuctionWinnerName($review->id) }}</a></div>
                        </div>
                        <div class="col-sm-9">
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
                            @if((Auth::user()->isAdmin()) || (Auth::user()->isBanned()))
                            @else
                            <a class="badge badge-light report" type="button" data-toggle="modal"
                               href="#exampleModal">
                                Report abuse
                            </a>
                            @endif

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

                        </div>
                    </div>
                </div>
                @endforeach
                @endif
            </div>
            <div class="tab-pane fade" id="itemsForSale" role="tabpanel" aria-labelledby="itemsForSale-tab">
                <div class="container-fluid">
                    <div class="col-md-12">
                        <ul>
                            @if(count($itemsForSale) == 0)
                                <p>This user isn't selling any item.</p>
                            @else
                            @foreach($itemsForSale as $item)
                            <li>
                                <div class="row">
                                    <div>
                                        <img height="200" class="d-block " src="{{ $item->getDisplayPictureURL() }}" alt="auction image">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="{{ url('auctions/' . $item->id)  }}">{{ $item->item_name }}</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col-md-10">
                                                <p>{{ $item->description }}</p>
                                            </div>
                                            <div class="col-md-10">
                                                <p>Current Bid: {{ $item->current_price }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            @endforeach
                            @endif
                        </ul>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="watchList" role="tabpanel" aria-labelledby="watchList-tab">
                <div class="container-fluid">
                    <div class="col-md-12">
                        <ul>
                            @if(count($wishlist) == 0)
                                <p>Add something to your wishlist!</p>
                            @else
                            @foreach($wishlist as $item)
                            <li>
                                <div class="row">
                                    <div>
                                        <img height="200" class="d-block " src="{{ $item->getDisplayPictureURL() }}" alt="auction image">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="{{ url('auctions/' . $item->id)  }}">{{ $item->item_name }}</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <p>{{ $item->description }}</p>
                                            </div>
                                            <div class="col">
                                                <p>Current Bid: {{ $item->current_price }}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <a href="#" class="btn btn-danger " data-toggle="collapse" data-target=".collapseAlert">Remove</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="collapse collapseAlert">
                                        <div class="alert alert-success" role="alert">
                                            <strong>Done!</strong> You removed this item from your Wishlist
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            @endforeach
                            @endif
                        </ul>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="biddingItems" role="tabpanel" aria-labelledby="biddingItems-tab">
                <div class="container-fluid">
                    <div class="col-md-12">
                        <ul>
                            @if(count($biddingItems) == 0)
                                <p>You're not bidding any item right now! What are you waiting for?</p>
                            @else
                            @foreach($biddingItems as $item)
                            <li>
                                <div class="row">
                                    <div>
                                        <img height="200" class="d-block " src="{{ $item->getDisplayPictureURL() }}" alt="auction image">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="{{ url('auctions/' . $item->id)  }}">{{ $item->item_name }}</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <p>{{ $item->description }}</p>
                                            </div>
                                            <div class="col">
                                                <p>Current Bid: {{ $item->current_price }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            @endforeach
                            @endif
                        </ul>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="purchaseHistory" role="tabpanel" aria-labelledby="purchaseHistory-tab">
                <div class="container-fluid">
                    <div class="col-md-12">
                        <ul>
                            @if(count($purchaseHistory) == 0)
                                <p>You haven't purchased anything yet...</p>
                            @else
                            @foreach($purchaseHistory as $item)
                            <li>
                                <div class="row">
                                    <div>
                                        <img height="200" class="d-block " src="{{ $item->getDisplayPictureURL() }}" alt="auction image">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="{{ url('auctions/' . $item->id)  }}">{{ $item->item_name }}</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <p>{{ $item->description }}</p>
                                            </div>
                                            <div class="col">
                                                <p>Current Bid: {{ $item->current_price }}</p>
                                            </div>
                                        </div>
                                        <div class="row padding-product-info">
                                            <div class="col">
                                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#feedbackModal"
                                                        data-whatever="@getbootstrap"> Leave Feedback
                                                </button>
                                            </div>
                                            <div class="modal fade" id="feedbackModal" tabindex="-1" role="dialog"
                                                 aria-labelledby="feedbackModal" aria-hidden="true">
                                                <div class="modal-dialog" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="contactModalLabel">Leave Feedback</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <form>
                                                                <div class="form-group">
                                                                    <label class="form-control-label">Rate the Auction:</label>
                                                                    <span class="sr-only">Four out of Five Stars</span>
                                                                    <span class="far fa-star" aria-hidden="true"></span>
                                                                    <span class="far fa-star" aria-hidden="true"></span>
                                                                    <span class="far fa-star" aria-hidden="true"></span>
                                                                    <span class="far fa-star" aria-hidden="true"></span>
                                                                    <span class="far fa-star" aria-hidden="true"></span>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="form-control-label">Feedback:</label>
                                                                    <label for="appeal-text"></label><textarea class="form-control" id="appeal-text"></textarea>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" id="closebtn" class="btn btn-secondary"
                                                                    data-dismiss="modal">Close
                                                            </button>
                                                            <button type="button" id="sendbtn"
                                                                    class="btn btn-primary">Leave Feedback
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col">
                                                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal1">
                                                    Ask for Refund
                                                </button>
                                            </div>
                                            <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                                 aria-hidden="true">
                                                <div class="modal-dialog" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title"> Ask for Refund</h5>
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
                                                                            <label><input type="radio" name="behaviour"> Received a counterfeit or fake item</label>
                                                                        </div>
                                                                        <div class="radio">
                                                                            <label><input type="radio" name="content">This item is illegal</label>
                                                                        </div>
                                                                        <div class="radio">
                                                                            <label><input type="radio" name="optradio">Received item is not in the original
                                                                                condition</label>
                                                                        </div>
                                                                    </div>
                                                                    <label for="recipient-name" class="col-form-label">Other:</label>
                                                                    <label>
                                                                        <input type="text" class="form-control">
                                                                    </label>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label for="message-text" class="col-form-label">Message:</label>
                                                                    <label>
                                                                        <textarea class="form-control"></textarea>
                                                                    </label>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            <button type="button" class="btn btn-primary">Send message</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            @endforeach
                            @endif
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            @endif
    </div>

    <input type = "hidden" value="{{Auth::user()->id}}" id="reporter">
    <div class="modal fade" id="cancelModal" tabindex="-1" role="dialog"
         aria-labelledby="cancelModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="removeModalLabel">Cancel Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <label for="user-pass" class="col-form-label">Password:</label>
                        <input type="password" class="form-control" id="admin-pass">
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                            data-dismiss="modal">Close
                    </button>
                    <button id="remove-btn" type="button" class="btn btn-danger report" data-dismiss="modal">Submit</button>
                </div>
            </div>
        </div>
    </div>
</div>

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
        var userid=url.split("/").pop();
        var reportedUser = userid;                                                         //MUDAR ISTO
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