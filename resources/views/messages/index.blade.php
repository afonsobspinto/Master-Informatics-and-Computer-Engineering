@extends('layouts.base')

@section('content')
<div class="container">
    <div class="mt-4">
        <nav class="navbar navbar-expand-sm navbar-light bg-faded" style="background-color: powderblue">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="col-9">
                    <div class="navbar-nav row">
                        <a class="nav-item nav-link active" href="#">Inbox
                            <span class="sr-only">(current)</span>
                        </a>
                        <a class="nav-item nav-link" href="#">Sent</a>
                        <a class="nav-item nav-link" href="#">Spam</a>
                    </div>
                </div>


                <div class="col-3">
                    <button id="sendmsg" type="button" class="btn btn-outline-success d-inline-block align-right" data-toggle="modal" data-target="#exampleModal"
                            data-whatever="@getbootstrap"> New Message  &nbsp; <a href="#"></a></button>
                    <button id="delete" type="button" class="btn btn-outline-danger d-inline-block align-right" data-toggle="modal" data-target="#exampleModal"
                            data-whatever="@getbootstrap"> Delete All &nbsp; <a href="#"><i class="fas fa-trash-alt"></i></a></button>

                    @yield('modal')
                                    </div>
            </div>
        </nav>
    </div>
</div>
<!-- messages -->
<div class="container">
    <table class="table mt-2  table-hover">
        <thead class="thead-inverse " style="color:#18bc9c; background-color:#464242">
        <tr>
            <th scope="col"></th>
            <th scope="col">From</th>
            <th scope="col">Subject</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        {{ $messages }}
        @foreach($messages as $message)
        <tr class="clickable-row" data-href="/messages/{{ $message->id }}">
            <th scope="row">
                <input type="checkbox" class="marcar">
                <a href="#">
                    <i class="far fa-star"></i>
                </a>
            </th>
            <td>{{ $message->username }}</td>
            <td>{{ $message->subject }}</td>
            <td>{{ $message->send_date }}</td>
            <td>
                <a href="#">
                    <i class="fas fa-trash-alt"></i>
                </a>
            </td>
        </tr>
        @endforeach
        </tbody>
    </table>
</div>

<script type="text/javascript">
    $(document).ready(function ($) {
        $(".clickable-row").click(function () {
            window.document.location = $(this).data("href");
        });
    });
</script>
@endsection
