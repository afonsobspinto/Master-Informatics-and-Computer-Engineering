@extends('layouts.base')

@section('resources')
@parent
<link rel="stylesheet" href="{{ asset('css/message.css') }}">
@endsection

@section('content')

<div class="container-fluid">
    <form route="{{route('messages.storeMessage')}}" method="POST" id="userForm" class="userForm">
        {{csrf_field() }}
        <fieldset>
            <legend hidden>Messages</legend>
            <nav class="navbar navbar-expand-sm navbar-light bg-faded" style="background-color: powderblue">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="col-8">
                        <div class="navbar-nav row">
                            <a class="nav-item nav-link active" href="/messages">Inbox</a>
                            <a class="nav-item nav-link" href="/messages_sent">Sent</a>
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
                        <a href="{{ url('profile/' . $message->id )  }}">
                            <img class="media-object center-block" src="{{ $photo }}" width="75%" alt="Username Picture" title="{{ $message->username }}">
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
                        <label for="article-ckeditor" hidden>Write your message:</label>
                        <textarea class="form-control" id="article-ckeditor" name="message-text" placeholder="Write your message!"></textarea>
                        <div class="row" id="trackingDiv">
                            <div class="col-5"></div>
                            <div class="col-2">
                                <br>
                                <br>
                                <button id="bew" class="btn btn-success d-inline-block sendmsg" > Send Message</button>
                            </div>
                            <div class="col-5"></div>
                        </div>
                    </div>

                    <div class="col-1">
                    </div>
                    <div class="col-1">
                        {!! Form::open(['action' => ['MessagesController@destroy',$message->id ], 'method'=>'POST']) !!}
                        <button class="btn btn-danger" type="button" data-toggle="modal" data-target="#alert" id="delete">Delete  </button>
                        <div class="modal fade" id="alert">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    </div>
                                    <div class="modal-body">
                                        <p>Are you sure, you want to delete this message?</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" data-dismiss="modal" id="closebtn">Cancel</button>
                                        <button type="submit" class="btn btn-danger">OK</button>
                                    </div>
                                    {{Form::hidden('_method', 'DELETE')}}
                                    <!--  {{Form::submit('Delete', ['class' => 'btn btn-primary'])}} -->
                                    {!! Form::close() !!}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </fieldset>
    </form>
    </div>

</div>

<script src="/vendor/unisharp/laravel-ckeditor/ckeditor.js"></script>
<script>
   var editor = CKEDITOR.replace( 'article-ckeditor' );
</script>

<script>
    $("#bew").click(function(e){
        e.preventDefault();

        var url = window.location.href;

        var iden =  url.split("/").pop();
        var receiver = $("#receiver").val();
        var subject = $("#sub").val();

        var content = editor.getData();

        var $form = $("#userForm");
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('route'),
            data:   {id: iden, rec: receiver, con: content, sub: subject},
            success: function (data) {
                if(data.error){
                    return;
                }
                alert(data.success); // THis is success message
                window.location.pathname = '/messages';
            },
            error: function (result) {
            }
        });
    });
</script>


@endsection
