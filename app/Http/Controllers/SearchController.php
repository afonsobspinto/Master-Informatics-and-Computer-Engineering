<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;


class SearchController extends Controller
{
    public function showSearch(Request $request) {
        $categories = Category::all();

        return view('pages.search', [
            'categories' => $categories,
        ]);
    }
}
