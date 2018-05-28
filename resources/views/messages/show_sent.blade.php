@extends('layouts.base')

@section('resources')
@parent
<link rel="stylesheet" href="{{ asset('css/message.css') }}">
@endsection

@section('content')

<div class="container-fluid">
    <form route="{{route('messages.storeMessage')}}" method="POST" id="userForm" class="userForm">
        {{csrf_field() }}
        <div class="mt-4">
            <nav class="navbar navbar-expand-sm navbar-light bg-faded" style="background-color: powderblue">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="col-8">
                        <div class="navbar-nav row">
                            <a class="nav-item nav-link" href="/messages">Inbox</a>
                            <a class="nav-item nav-link active" href="/messages_sent">Sent</a>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="container-fluid mt-2 mb-2 d-flex flex-column p-4 bg-light">

            <div class="row">
                <h4 class="mx-auto pt-3 pb-3 mb-4 font-weight-bold" id="subject" name="subject">{{ $message->subject }}</h4>

            </div>
            <div class="media row">
                <div class="media-right col-3 d-flex d-none d-sm-block d-sm-block d-xs-block">
                    <a href="profile_page.html">
                        <img class="media-object center-block" src="{{$photo}}" width="75%">
                    </a>
                    <h4 class="media-heading d-none d-sm-block d-sm-block d-xs-block" align="left">{{ $message->username }}</h4>
                </div>


                <div class="media-left col-7">
                    <div class="media-body">
                        <p align="right">{{ $message->send_date }}</p>
                        <p class="text-justify">{!! $message->message !!}</p>
                    </div>
                    <br>
                    <input type="hidden" value="{{$message->id}}" name="receiver" id="receiver" class="form-control"/>
                    <input type="hidden" value="" name="id" id="id" class="form-control"/>

                    <input type="hidden" value="{{ $message->subject }}" name="sub" id="sub" class="form-control"/>
                    <div class="row" id="trackingDiv">
                        <div class="col-5"></div>
                        <div class="col-2">
                        </div>
                        <div class="col-5"></div>
                    </div>
                </div>

                <div class="col-1">
                </div>


            </div>

        </div>
</div>
</form>
</div>

@endsection
