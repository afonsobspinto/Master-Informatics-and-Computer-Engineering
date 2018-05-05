@extends('layouts.base', ['categories' => $categories])

@section('title', 'Home')

@section('resources')
    @parent
    <link rel="stylesheet" href="{{ asset('css/landing_page.css') }}">
@endsection

@section('content')
    @include('auctions.components.display_carousel', ['displayAuctions' => $displayAuctions])

    @include('auctions.cards', ['auctions' => $recentAuctions, 'recent' => true])

    @include('auctions.cards', ['auctions' => $endingSoonAuctions, 'recent' => false])

@endsection
