@extends('auctions.components.carousel', ['iterable' => $displayAuctions])


@section('carousel-guts')
    @foreach($displayAuctions as $auction)
        <div class="carousel-item {{ $loop->first ? 'active' : '' }}">
            <a href="{{ url("auctions/{$auction->id}") }}">
                <img class="d-block " src="{{ $auction->getDisplayPictureURL() }}" alt="auction image">
                <div class="carousel-caption d-md-block ">
                    <h3>
                        {{ str_limit($auction->item_name, 100, ' ...') }}
                    </h3>
                    <h4><strong class="display-4">
                            {{ $auction->currentPriceEuros() }}€
                        </strong></h4>
                    <h5>{{ $auction->numBids() }} bids</h5>
                </div>
            </a>
        </div>
    @endforeach
@endsection