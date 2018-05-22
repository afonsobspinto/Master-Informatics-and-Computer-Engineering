@extends('layouts.base')

@section('resources')
@parent
<link rel="stylesheet" href="{{ asset('css/report.css') }}">
@endsection

@section('content')

<div class="container">

    <h3 class="border-bottom pb-1 mb-4 mt-5"> Account reports </h3>

    <!-- Questions and answers -->
    <div id="accordion" class="mt-4 pb-5" id="qAndA">
        @foreach($rep as $report)
        <div class="card">
            <div class="card-header" id="heading1" style="background-color:#ecf0f1; border-color:#e74c3c">
                <div class="row">
                    <div class="col-9">
                        <a href="profile/ {{$report->id}}"> {{$report-> username}} </a>&nbsp;
                        <a class="btn-link" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                            <input type="hidden" id="message_complete" value="{{$report->message}}">
                            <span style="color:black">  said:</span> <h4 class="dropdown-toggle">   {{$report->subject}}  </h4> about <a href="auctions/{{$report->auction_id}} "> {{$report->item_name}} 	&nbsp; </a>
                        </a>
                    </div>
                    <div class="col-3">
                    </div>
                </div>
            </div>
            <div id="collapse1" class="collapse" aria-labelledby="heading1" data-parent="#accordion">
                <div class="card-body">
                    <div class="col-4">
                    </div>
                    <div class="col-12">
                        {
                        <br>
                        <br>
                        <div class="form-group row">
                            <br>
                            <br>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-5"></div>
                            <div class="col-7">
                                <button id = "sendbtn" type="button" class="btn btn-success ""> Send Answer </button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endforeach
        <br>
        <br>
        <div class="row">
            <div class="col-5">
            </div>
            <div class="col-7">
                {{ $reports->links("pagination::bootstrap-4") }}
            </div>
        </div>
    </div>
</div>

@endsection
