
<!-- auctions carousel -->
<div id="carouselAuctions" class="carousel slide mt-4 mx-auto" data-ride="carousel">
    <div class="carousel-inner">
        @php ($activeItem = "active")
        @foreach($displayAuctions as $auction)
        <div class="carousel-item {{ $activeItem }}">
            <a href="../auction/auction.html">
                <img class="d-block " src="{{ $auction->getDisplayPictureURL() }}" alt="auction image">
                <div class="carousel-caption d-md-block">
                    <h3>
                        {{ str_limit($auction->item_name, 100, ' ...') }}
                    </h3>
                    <h4><strong class="display-4">
                            {{ $auction->currentPriceString() }}
                        </strong></h4>
                    <h5>{{ $auction->numBids() }} bids</h5>
                </div>
            </a>
        </div>
        @php ($activeItem = "")
        @endforeach
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