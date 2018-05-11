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
            <img src="https://vignette.wikia.nocookie.net/antagonist/images/8/8b/Mr._Burns.jpg"
                 alt="Picture" style="width:100%">
        </div>
        <div class="col-md-3">
            <div class="row">
                <h1>{{ $user->username }}</h1>
            </div>
            <div class="row">
                <p>{{ $user->getCountryID() }}</p>
            </div>
            <div class="row">
                <p class="email">{{ $user->email }}</p>
            </div>
            <div class="row">
                <span class="sr-only">Four out of Five Stars</span>
                <span class="fas fa-star" aria-hidden="true"></span>
                <span class="fas fa-star" aria-hidden="true"></span>
                <span class="fas fa-star" aria-hidden="true"></span>
                <span class="fas fa-star" aria-hidden="true"></span>
                <span class="far fa-star" aria-hidden="true"></span>
                <span class="badge badge-success">61</span>
            </div>
            @if(Auth::check())
                @if(Auth::user()->isProfileOwner($user))
                    <div class="row">
                        <a href="{{ url('profile/' . Auth::user()->id . '/edit')  }}" class="btn btn-primary ">Edit Profile</a>
                    </div>
                    <div class="row">
                        <a href="#" class="btn btn-danger" data-toggle="modal" data-target="#cancelModal">Cancel Account</a>
                    </div>
                @else
                    <div class="row">
                        <a class="badge badge-light report" type="button" data-toggle="modal"
                           href="#exampleModal">
                            Report abuse
                        </a>
                    </div>
                @endif
            @endif
        </div>

        <!-- Nav tabs -->
        <ul class="nav nav-tabs">
            <li class="active">
                <a class="nav-link active" id="feedback-tab" data-toggle="tab" href="#feedback" role="tab" aria-controls="feedback" aria-selected="true">Feedback</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="itemsForSale-tab" data-toggle="tab" href="#itemsForSale" role="tab" aria-controls="itemsForSale" aria-selected="true">Items for Sale</a>
            </li>
            @if(Auth::check())
                @if(Auth::user()->isProfileOwner($user))
                    <li class="nav-item">
                        <a class="nav-link" id="watchList-tab" data-toggle="tab" href="#watchList" role="tab" aria-controls="watchList" aria-selected="true">Watch List</a>
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
        <!-- Tab panes -->
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="feedback" role="tabpanel" aria-labelledby="feedback-tab">
                <div class="review-block">
                    <div class="row">
                        <div class="col-sm-3">
                            <img src="http://eikonline.com/wp-content/uploads/2015/09/Mr-Smithers-696x490.jpeg" class="img-review img-fluid">
                            <div class="review-block-name"><a href="profile.html">Smithers</a></div>
                            <div class="review-block-date">March 01, 2018</div>
                        </div>
                        <div class="col-sm-9">
                            <div class="review-block-rate">
                                <span class="fas fa-star" aria-hidden="true"></span>
                                <span class="fas fa-star" aria-hidden="true"></span>
                                <span class="fas fa-star" aria-hidden="true"></span>
                                <span class="fas fa-star" aria-hidden="true"></span>
                                <span class="fas fa-star" aria-hidden="true"></span>
                            </div>
                            <div class="review-block">Excellent seller, quick shipping A++++++</div>
                            <a class="badge badge-light report" type="button" data-toggle="modal"
                               href="#exampleModal">
                                Report abuse
                            </a>
                        </div>
                    </div>
                </div>
                <div class="review-block">
                    <div class="row">
                        <div class="col-sm-3">
                            <img src="http://interactive.nydailynews.com/2016/05/simpsons-quiz/img/simp1.jpg" class="img-review img-fluid">
                            <div class="review-block-name"><a href="profile.html">Homer Simpson</a></div>
                            <div class="review-block-date">March 02, 2018</div>
                        </div>
                        <div class="col-sm-9">
                            <div class="review-block-rate">
                                <span class="fas fa-star" aria-hidden="true"></span>
                                <span class="fas fa-star" aria-hidden="true"></span>
                                <span class="far fa-star" aria-hidden="true"></span>
                                <span class="far fa-star" aria-hidden="true"></span>
                                <span class="far fa-star" aria-hidden="true"></span>
                            </div>
                            <div class="review-block">Some of the donuts were already eaten</div>
                            <a class="badge badge-light report" type="button" data-toggle="modal"
                               href="#exampleModal">
                                Report abuse
                            </a>
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
                                            <form>
                                                <div class="form-group">
                                                    <div>
                                                        <h5 style="color:brown"> Motive</h5>
                                                        <div class="radio">
                                                            <label><input type="radio"
                                                                          name="behaviour"> Abusive behaviour </label>
                                                        </div>
                                                        <div class="radio">
                                                            <label><input type="radio" name="content">Inappropriate content in
                                                                profile </label>
                                                        </div>
                                                        <div class="radio">
                                                            <label><input type="radio"
                                                                          name="optradio">Didn't receive an item</label>
                                                        </div>
                                                    </div>
                                                    <label for="recipient-name" class="col-form-label">Other:</label>
                                                    <input type="text" class="form-control" id="recipient-name">
                                                </div>
                                                <div class="form-group">
                                                    <label for="message-text" class="col-form-label">Message:</label>
                                                    <textarea class="form-control" id="message-text"></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                    data-dismiss="modal">Close
                                            </button>
                                            <button type="button" class="btn btn-primary report">Report</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="itemsForSale" role="tabpanel" aria-labelledby="itemsForSale-tab">
                <div class="container-fluid">
                    <div class="col-md-12">
                        <ul>
                            <li>
                                <div class="row">
                                    <div>
                                        <img src="http://www.bbxuk.com/wp-content/uploads/2015/05/computer-05.jpg" alt="result 1" width="250" height="150">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="../auction/auction.html">Computer with Keyboard and Mouse</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <p>Technology</p>
                                            </div>
                                            <div class="col">
                                                <p>Time Left: 18 minutes</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="row">
                                    <div>
                                        <img src="http://d26lpennugtm8s.cloudfront.net/stores/485/599/products/tenis-nike-air-pernix-branco-loja-hdr-lojahdr-com-441-6e4814cc2c28839f4f15050750878402-640-0.jpg" alt="result 1" width="250" height="150">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="../auction/auction.html">Chinese Shoes</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <p>Clothing</p>
                                            </div>
                                            <div class="col">
                                                <p>Time Left: 9 hours</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                </div>
                                <div class="row">
                                    <div>
                                        <img src="https://www.renaultretail.co.uk/assets/rr/images/vehicle/new-renault/vehicle-images/cars/renault-clio/range/06-renault-clio-titanium-grey.png" alt="result 1" width="250" height="150">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="../auction/auction.html">2º hand car</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <p>Cars</p>
                                            </div>
                                            <div class="col">
                                                <p>Time Left: 5 days</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="watchList" role="tabpanel" aria-labelledby="watchList-tab">
                <div class="container-fluid">
                    <div class="col-md-12">
                        <ul>
                            <li>
                                <div class="row">
                                    <div class="collapse collapseAlert">
                                        <div class="alert alert-success" role="alert">
                                            <strong>Done!</strong> You removed this item from your WatchList
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div>
                                        <img src="http://cdn1.shopmania.biz/files/s4/452423870/p/l/9/cofre-alta-seguranca-digital-map20ea~5089.jpg" alt="result 1" width="250" height="150">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="../auction/auction.html">Steel Lock</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <p>Accessories</p>
                                            </div>
                                            <div class="col">
                                                <p>Time Left: 58 minutes</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <a href="#" class="btn btn-danger " data-toggle="collapse" data-target=".collapseAlert">Remove</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="row">
                                    <div>
                                        <img src="https://d11fk7pxhipp6v.cloudfront.net/products/esprit-17871-538-black-56-sunglass-with-graduated--2094664968.jpg" alt="result 1" width="250" height="150">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="../auction/auction.html">Espirit Sunglasses</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <p>Accessories</p>
                                            </div>
                                            <div class="col">
                                                <p>Time Left: 23 hours</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <a href="#" class="btn btn-danger " data-toggle="collapse" data-target=".collapseAlert">Remove</a>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="biddingItems" role="tabpanel" aria-labelledby="biddingItems-tab">
                <div class="container-fluid">
                    <div class="col-md-12">
                        <ul>
                            <li>
                                <div class="row">
                                    <div>
                                        <img src="https://http2.mlstatic.com/quadro-pug-pop-art-cachorro-pet-rrs2-decoracao-sala-paspatur-D_NQ_NP_761901-MLB20437861082_102015-F.jpg" alt="result 1" width="250" height="150">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="../auction/auction.html">Dog Painting</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <p>Accessories</p>
                                            </div>
                                            <div class="col">
                                                <p>Time Left: 17 hours</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="row">
                                    <div>
                                        <img src="https://rukminim1.flixcart.com/image/832/832/book/1/5/9/a-game-of-thrones-the-story-continues-the-complete-box-set-of-7-books-original-imadfgzztg4ahyhk.jpeg?q=70" alt="result 1" width="250" height="150">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="../auction/auction.html">Game of Thrones Books Colection</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <p>Books</p>
                                            </div>
                                            <div class="col">
                                                <p>Time Left: 2 days</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                </div>
                                <div class="row">
                                    <div>
                                        <img src="https://www.console-deals.com/advice/wp-content/uploads/2017/10/xxpro.png.pagespeed.ic.HIrMrwzGC5.webp" alt="result 1" width="250" height="150">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="../auction/auction.html">PS4 with Controloer</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <p>Technology</p>
                                            </div>
                                            <div class="col">
                                                <p>Time Left: 4 days</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="purchaseHistory" role="tabpanel" aria-labelledby="purchaseHistory-tab">
                <div class="container-fluid">
                    <div class="col-md-12">
                        <ul>
                            <li>
                                <div class="row">
                                    <div>
                                        <img src="https://www.directofficesupply.co.uk/components/com_virtuemart/shop_image/product/a6a464b6cccdfdef717e6eb5a0838fa3.jpg" alt="result 1" width="250" height="150">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="../auction/auction.html">Office Desk</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <p>Accessories</p>
                                            </div>
                                            <div class="col">
                                                <p>Purchased March, 4th</p>
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
                            <li>
                                <div class="row">
                                    <div>
                                        <img src="https://img2.insania.com/imagens/30000/3026/02.jpg" alt="result 1" width="250" height="150">
                                    </div>
                                    <div class="col align-self-center">
                                        <h4>
                                            <a href="../auction/auction.html">Dog Collar with Chip</a>
                                        </h4>
                                        <div class="row padding-product-info">
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <p>Animals</p>
                                            </div>
                                            <div class="col">
                                                <p>Purchased March, 1st</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
                        <label for="admin-pass" class="col-form-label">Password:</label>
                        <input type="password" class="form-control" id="admin-pass">
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                            data-dismiss="modal">Close
                    </button>
                    <button type="button" class="btn btn-danger report">Submit</button>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection