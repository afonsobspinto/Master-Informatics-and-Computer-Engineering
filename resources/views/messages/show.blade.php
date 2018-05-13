@extends('layouts.base')

@section('content')

<div class="container-fluid">
    <div class="mt-2">
        <nav class="navbar navbar-expand-sm navbar-light bg-faded" style="background-color: powderblue">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="col-10">
                    <div class="navbar-nav ro">
                        <a class="nav-item nav-link active" href="chat.html">Inbox <span class="sr-only">(current)</span></a>
                        <a class="nav-item nav-link" href="chat.html">Sent</a>
                        <a class="nav-item nav-link" href="chat.html">Spam</a>
                    </div>
                </div>
        </nav>
    </div>


    <div class="container-fluid mt-2 mb-2 d-flex flex-column p-4 bg-light">

        <div class="row">
            <h4 class="mx-auto pt-3 pb-3 mb-4 font-weight-bold ">{{ $message->subject }}</h4> <a href="#"><i class="fas fa-trash"></i></a>
        </div>
        <div class="media row">
            <div class="media-right col-3 d-flex d-none d-sm-block d-sm-block d-xs-block">
                <a href="profile_page.html">
                    <img class="media-object center-block" src="https://vignette.wikia.nocookie.net/antagonist/images/8/8b/Mr._Burns.jpg" width="75%">
                </a>
                <h4 class="media-heading d-none d-sm-block d-sm-block d-xs-block" align="left">{{ $message->username }}</h4>
            </div>


            <div class="media-left col-7">
                <div class="media-body">
                    <p align="right">{{ $message->send_date }}</p>
                    <p class="text-justify">{{ $message->message }}</p>
                </div>

                <div class="form-group">
                    <textarea class="form-control" id="message-text" placeholder="Write your message!"></textarea>
                </div>
                <div class="row">
                    <div class="col-5"></div>
                    <div class="col-2">
                        <button id="sendmsg" type="button" class="btn btn-outline-success d-inline-block"  data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap"> Send Message</button>
                    </div>
                    <div class="col-5"></div>

                </div>


            </div>

            <div class="col-2">
            </div>


        </div>

    </div>
</div>
</div>
@endsection
