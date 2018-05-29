<!doctype html>
<html lang="en">
    <head>
        <title>{{ config('app.name') }} - @yield('title')</title>
        <link rel='shortcut icon' type='image/x-icon' href='{{ asset('/images/icon.png') }}' />
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        @include('components.bootstrap')

        <!-- links -->
        @section('resources')
            <script src="{{ asset('js/common.js') }}" async></script>
            <script src="{{ asset('js/polling.js') }}" defer></script>
            <script src="{{ asset('js/header.js') }}" defer></script>
            <link rel="stylesheet" href="{{ asset('css/header.css') }}">
            <link rel="stylesheet" href="{{ asset('css/footer.css') }}">
        @show
    </head>
    <body class="website-body">

        @include('components.header', ['categories' => $categories])

        <div class="@yield('body-class', 'container mb-5 ')" id="page-body-section">
            @yield('content')

        </div>

        @include('components.footer')
    </body>

</html>