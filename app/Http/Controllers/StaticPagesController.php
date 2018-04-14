<?php

namespace App\Http\Controllers;

use App\Item;
use App\Card;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class StaticPagesController extends Controller
{
    public function showLandingPage(Request $request) {
        return view('staticPages.landingPage');
    }

}
