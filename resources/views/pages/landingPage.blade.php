@extends('layouts.base', ['categories' => $categories])

@section('title', 'Home')

@section('resources')
    @parent
    <link rel="stylesheet" href="{{ asset('css/landing_page.css') }}">
    <link rel="stylesheet" href="{{ asset('css/carousel.css') }}">
@endsection

@section('content')
    @include('auctions.components.display_carousel', ['displayAuctions' => $displayAuctions])

    @include('pages.components.cards', ['auctions' => $recentAuctions, 'recent' => true])

    @include('pages.components.cards', ['auctions' => $endingSoonAuctions, 'recent' => false])

@endsection
