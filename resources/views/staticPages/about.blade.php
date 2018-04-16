@extends('layouts.base', ['categories' => $categories])

@section('title', 'About')

@section('resources')
@parent
<link rel="stylesheet" href="{{ asset('css/about.css') }}">
@endsection

@section('content')
<!doctype html>
<html lang="en">

<div class="container">

    <video width="1000" height="600" autoplay id="commercial">
        <source src="../../../public/media/commercial.mp4" type="video/mp4">
    </video>

    <h3 class="border-bottom pb-1 mb-4">About BidBay </h3>
    <p>BidBay is a website where users can do all of their shopping (new, second hand, handcrafted or miscellaneous items) where the seller is another user like them. Do you have something you want to sell? Want something from our users? Start your selling and shopping here, at BidBay! </p>
    <br>
    <div>Logo made with <a href="https://www.designevo.com/" title="Free Online Logo Maker">DesignEvo</a></div>
    <h4 class="border-bottom pb-1 mb-4 mt-5">Contact the Team </h4>
    <div class="container-fluid">
        <div class="row" id="creators">
            <div class="col-6 col-md-3">
                <p>Afonso Pinto</p>
                <p>Cristiana Ribeiro</p>
                <p>Rostyslav Khoptiy</p>
                <p>Tomás Oliveira</p>
            </div>

            <div class="col-3">
                <p>up201503316@fe.up.pt</p>
                <p>up201305188@fe.up.pt</p>
                <p>up201506219@fe.up.pt</p>
                <p>up201504746@fe.up.pt</p>
            </div>


        </div>
    </div>

</div>



@endsection
