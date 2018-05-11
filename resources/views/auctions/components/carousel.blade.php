
@php($bMultiple = count($iterable) > 1)

<!-- auctions carousel -->
<div id="carouselAuctions" class="carousel slide mt-4 mx-auto" data-ride="carousel">
    @if($bMultiple)
        <ol class="carousel-indicators">
            @foreach($iterable as $iteration)
                <li data-target="#carouselAuctions" data-slide-to="{{ $loop->index }}" class="{{ $loop->first ? 'active' : '' }}"></li>
            @endforeach
        </ol>
    @endif
    <div class="carousel-inner">
        @yield('carousel-guts')
    </div>
    @if($bMultiple)
        <a class="carousel-control-prev" href="#carouselAuctions" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselAuctions" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    @endif
</div>