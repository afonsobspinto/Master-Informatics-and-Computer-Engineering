
<div class="container mt-5 auction-grid">
    <h3 class="border-bottom mb-3">
        @if($recent)
            Most Recent:
        @else
        Ending Soon:
        @endif
    </h3>
    <div class="card-columns">
        @foreach($auctions as $auction)
        <div class="card border-info">
            <a href="../auction/auction.html">
                <!-- place auction data here -->
                <!-- images can be any size -->
                <img class="card-img-top" src="{{ $auction->getDisplayPictureURL() }}" alt="auction image">
                <div class="card-body">
                    <h3 class="card-title">{{ $auction->item_name }}</h3>
                    <p class="card-subtitle mb-2 text-muted">
                        <strong class="display-4">{{ $auction->currentPriceEuros() }}€ </strong>
                        {{ $auction->numBids() }} bids</p>
                    <p class="card-text">{{ str_limit($auction->description, 300, ' ...') }}</p>
                    <p class="card-text">
                        <small class="text-muted">
                            @if($recent)
                            Submitted {{ $auction->getSubmittedTimeString() }} ago
                            @else
                            Ending in {{ $auction->getTimeLeftString() }}
                            @endif
                        </small>
                    </p>
                </div>
            </a>
        </div>
        @endforeach
    </div>
</div>