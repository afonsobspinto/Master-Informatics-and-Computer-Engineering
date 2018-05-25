@extends('layouts.base')

@section('resources')
@parent
<link rel="stylesheet" href="{{ asset('css/chat.css') }}">
@endsection

@section('content')
<div class="container">
    <div class="mt-4">
        <nav class="navbar navbar-expand-sm navbar-light bg-faded" style="background-color: powderblue">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="col-8">
                    <div class="navbar-nav row">
                        <a class="nav-item nav-link " href="/messages">Inbox
                            <span class="sr-only">(current)</span>
                        </a>
                        <a class="nav-item nav-link" href="#">Sent</a>
                    </div>
                </div>


                <div class="col-4">
                    <button id="sendmsg" type="button" class="btn btn-success d-inline-block" data-toggle="modal" data-target="#exampleModal"
                            data-whatever="@getbootstrap"> New Message  &nbsp; </button> &nbsp; &nbsp;

                    <button id="delete" type="button" class="btn btn-danger d-inline-block" data-toggle="modal" data-target="#alert"
                            data-whatever="@getbootstrap"> Delete All &nbsp; &nbsp; &nbsp; <i class="fas fa-trash-alt"></i></button>

                    <div class="modal fade" id="alert">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                </div>
                                <div class="modal-body">
                                    <p>Are you sure, you want to delete all messages?</p>
                                </div>
                                {!! Form::open(['action' => 'MessagesController@deleteAllMessages', 'method'=>'POST']) !!}
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" id="closebtn" data-dismiss="modal">Cancel</button>
                                    <button type="submit" class="btn btn-danger" id ="danger">OK</button>
                                </div>
                                {{Form::hidden('_method', 'DELETE')}}
                                {!! Form::close() !!}
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->
                    </div><!-- /.modal -->



                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form route="{{route('messages.store')}}" method="POST" id="userForm" class=="userForm">
                                {{csrf_field() }}
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label label for="recipient-name" class="form-control-label">To:</label>
                                        <input type="text" class="form-control" id="recipient-name" name="recipient-name" maxlength="50">
                                    </div>
                                    <div class="form-group">
                                        <label for="item-name" class="form-control-label">Subject:</label>
                                        <input type="text" class="form-control" id="item-name" name="item-name" maxlength="50">
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="form-control-label">Message:</label>
                                        <textarea class="form-control" id="message-text" name="message-text"></textarea>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" id="closebtn" class="btn btn-success" data-dismiss="modal">Close</button>
                                    <button  id="bew" class="btn btn-success">Send message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </nav>
</div>
</div>

<!-- messages -->
<div class="container">
    <table id = "table" class="table mt-2  table-hover">
        <thead class="thead-inverse " style="color:#18bc9c; background-color:#464242">
        <tr>
            <th scope="col"></th>
            <th scope="col">To</th>
            <th scope="col">Subject</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        @foreach($messages as $message)
        <tr>
            <th scope="row">
            </th>
            <td class="clickable-row" data-href="/messages/{{ $message->id }}">{{ $message->username }}</td>
            <td class="clickable-row" data-href="/messages/{{ $message->id }}">{{ $message->subject }}</td>
            <td class="clickable-row" data-href="/messages/{{ $message->id }}">{{ $message->send_date }}</td>
            <td></td>
            <td></td>
            <td>
                {!! Form::open(['action' => ['MessagesController@destroy',  $message->id ], 'method'=>'POST']) !!}
                <button class="btn btn-danger btn-sm" id ="delete" type="submit">Delete</button>
                {{Form::hidden('_method', 'DELETE')}}
                {!! Form::close() !!}
            </td>
        </tr>
        @endforeach
        </tbody>
    </table>
</div>

<div class="row">
    <div class="col-5">
    </div>
    <div class="col-7">
        {{ $messages->links("pagination::bootstrap-4") }}
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function ($) {
        $('.clickable-row').click(function () {
            window.document.location = $(this).data("href");
        });
    });
</script>

<script src="/vendor/unisharp/laravel-ckeditor/ckeditor.js"></script>
<script>
    var editor = CKEDITOR.replace( 'message-text' );
</script>

<script>
    $("#bew").click(function(e){
        e.preventDefault();
        var $form = $("#userForm");

        var message = editor.getData();
        console.log("message" , message);
        var subject = $("#item-name").val();
        console.log("sub" , subject);
        var receiver_id = $("#recipient-name").val();
        console.log("id" , receiver_id);
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('route'),
            data: {msg: message, sub:subject, id:receiver_id},
            success: function (data) {
                if(data.error){
                    return;
                }
                alert(data.success); // THis is success message
                $('#exampleModal').modal('hide');  // Your modal Id
                window.location.reload(true);
            },
            error: function (result) {
            }
        });
    });
</script>
@endsection
