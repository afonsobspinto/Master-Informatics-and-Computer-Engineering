<!-- header -->
<nav class="navbar navbar-light bg-light sticky-top navbar-expand-sm justify-content-around" id="header">
    <!-- logo -->
    <a id="logo-link" href="{{ url('/landing_page') }}" class="navbar-brand">
        <img id="logo" src="{{ asset('/images/logo.png') }}" alt="Logo" title="Logo">
    </a>
    <!-- search bar -->
    <form action="{{ url('search') }}" enctype="application/x-www-form-urlencoded" method="get" class="px-2" id="search-bar">
        <div class="d-flex">
            <input class="form-control rounded-1" name="search-input" type="search" placeholder="Search" aria-label="Search" value="{{ $searchString ?? "" }}" id="search-input">
            <select class="form-control rounded-1 col-2" name="category" id="search-categories">
                <option value="ALL" @if(! isset($categoryID)) selected @endif> All Categories</option>
                @php($categories = \App\Category::getSortedCategories())
                @foreach($categories as $category)
                <option value="{{ $category->id }}" @if(isset($categoryID) && $categoryID == $category->id) selected @endif>{{ ucfirst($category->name) }}</option>
                @endforeach
            </select>
            <button class="btn btn-dark rounded-1 " type="submit" title="Search"><i class="fas fa-search"></i></button>
        </div>
    </form>
    @auth
    {{--logged in user--}}
    <!-- authentication links -->
    <a class="fa-stack fa-3x" id="mail-icon" href="/messages">
        <i class="far fa-envelope fa-stack-2x"></i>
        <!-- place numbers of messages here -->
        <strong id="num-messages" class="fa-stack-1x calendar-text got-messages mail-icon-number">
            0
        </strong>
        <input type="hidden" id="header-user-id" value="{{ Auth::id() }}">
    </a>
    <div class="dropdown" id="authentication">
        <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true">
            {{ Auth::user()->username }} <span class="caret"></span>
        </a>
        <div class="dropdown-menu dropdown-menu-right" id="header-dropdown" aria-labelledby="authenticated-dropdown"
             role="menu">
            @if(Auth::user()->isAdmin())
            <a class="dropdown-item" href="/reports">User Reports</a>
            @elseif(Auth::user()->isRegular())
            <a class="dropdown-item" href="{{ url('/auctions/create') }}">New Auction</a>
            @endif
            {{-- TODO direct profile to actual profile --}}
            <a class="dropdown-item" href="{{ url('profile/' . Auth::user()->id) }}">Profile</a>
            <a class="dropdown-item" href="../chat.html" id="messages-dropdown-item">Messages <strong
                        class="got-messages">27</strong>
            </a>
            <a class="dropdown-item" href="{{ route('logout') }}"
               onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                Logout
            </a>

            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                {{ csrf_field() }}
            </form>
        </div>
    </div>
    @endauth
    @guest
    {{--not logged in user--}}
    <!-- mobile authentication button -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#authentication">
        <span class="navbar-toggler-icon"></span>
    </button>
    <!-- authentication links -->
    <div class="navbar-collapse collapse justify-content-end" id="authentication">
        <ul class="nav navbar-nav">
            <li class="nav-item">
                <a class="nav-link text-right" href="/login">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-right" href="/register">Register</a>
            </li>
        </ul>
    </div>
    @endauth
</nav>