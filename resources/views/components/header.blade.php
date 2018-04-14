<!-- header -->
<nav class="navbar navbar-light bg-light sticky-top navbar-expand-sm justify-content-around" id="header">
    <!-- logo -->
    <a href="landing_page.html" class="navbar-brand">BidBay</a>
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
</nav>