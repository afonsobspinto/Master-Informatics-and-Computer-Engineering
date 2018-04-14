<!-- header -->
<nav class="navbar navbar-light bg-light sticky-top navbar-expand-sm justify-content-around" id="header">
    <!-- logo -->
    <a href="{{ url('/landing_page') }}" class="navbar-brand">BidBay</a>
    <!-- search bar -->
    <form action="../advanced_search.html" method="get" class="px-2" id="search-bar">
        <div class="d-flex">
            <input class="form-control rounded-1" type="search" placeholder="Search" aria-label="Search"
                   id="search-input">
            <select class="form-control rounded-1 col-2 " id="search-categories">
                <option selected> All Categories</option>
                <option>Technology</option>
                <option>Automobiles</option>
                <option>Clothes</option>
            </select>
            <button class="btn btn-dark rounded-1 " type="submit"><i class="fas fa-search"></i></button>
        </div>
    </form>
    @if(Auth::check())
    {{--basic normal logged in user--}}
    <!-- authentication links -->
    <a class="fa-stack fa-3x" id="mail-icon" href="../chat.html">
        <i class="far fa-envelope fa-stack-2x"></i>
        <!-- place numbers of messages here -->
        <strong class="fa-stack-1x calendar-text got-messages mail-icon-number">
            27
        </strong>
    </a>
    <div class="dropdown" id="authentication">
        <a class="dropdown-toggle nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
           aria-expanded="false">
            <!-- place class extra-hide after a 5 characters if name too big to fit on smartphones -->
            M1dwaijaowdjo
        </a>
        <div class="dropdown-menu dropdown-menu-right" id="header-dropdown" aria-labelledby="authenticated-dropdown"
             role="menu">
            <a class="dropdown-item" href="../sell_page.html">New Auction</a>
            <a class="dropdown-item" href="../profile/profile_asUser.html">Profile</a>
            <a class="dropdown-item" href="../chat.html" id="messages-dropdown-item">Messages <strong
                        class="got-messages">27</strong>
            </a>
            <a class="dropdown-item" href="{{ url('/landing_page') }}">Log out</a>
        </div>
    </div>
    @elseif(false)
    {{-- TODO check if user is admin HERE--}}
    <!-- authentication links -->
    <a class="fa-stack fa-3x" id="mail-icon" href="../chat.html">
        <i class="far fa-envelope fa-stack-2x"></i>
        <!-- place numbers of messages here -->
        <strong class="fa-stack-1x calendar-text got-messages mail-icon-number">
            12
        </strong>
    </a>
    <div class="dropdown" id="authentication">
        <a class="dropdown-toggle nav-link" href="#" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <!-- place class extra-hide after a 5 characters if name too big to fit on smartphones -->
            Administrator
        </a>
        <div class="dropdown-menu dropdown-menu-right" id="header-dropdown" aria-labelledby="authenticated-dropdown" role="menu">
            <a class="dropdown-item" href="../report.html">User Reports</a>
            <a class="dropdown-item" href="../profile/profile_asUser.html">Profile</a>
            <a class="dropdown-item" href="../chat.html" id="messages-dropdown-item">Messages      <strong class="got-messages">27</strong>
            </a>
            <a class="dropdown-item" href="{{ url('/landing_page') }}">Log out</a>
        </div>
    </div>
    @else
    {{--not logged in user--}}
    <!-- mobile authentication button -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#authentication">
        <span class="navbar-toggler-icon"></span>
    </button>
    <!-- authentication links -->
    <div class="navbar-collapse collapse justify-content-end" id="authentication">
        <ul class="nav navbar-nav">
            <li class="nav-item">
                <a class="nav-link text-right" href="../login.html">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-right" href="../register.html">Register</a>
            </li>
        </ul>
    </div>
    @endif
</nav>