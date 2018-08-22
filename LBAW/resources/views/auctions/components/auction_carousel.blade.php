@extends('auctions.components.carousel', ['iterable' => $imageURLs])


@section('carousel-guts')
    @foreach($imageURLs as $url)
            <div class="carousel-item {{ $loop->first ? 'active' : '' }}">
                <img class="d-block w-100" src="{{ $url }}" alt="Auction Image" title="Auction Image">
            </div>
    @endforeach
@endsection