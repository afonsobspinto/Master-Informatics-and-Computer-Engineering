@extends('layouts.base')

@section('title', 'Home')

@section('resources')
    @parent
    <link rel="stylesheet" href="{{ asset('css/landing_page.css') }}">
@endsection

@section('content')
    @include('auctions.carousel', ['displayAuctions' => $displayAuctions])

    @include('auctions.cards', ['auctions' => $recentAuctions, 'recent' => true])

    @include('auctions.cards', ['auctions' => $endingSoonAuctions, 'recent' => false])

    </div>
@endsection
