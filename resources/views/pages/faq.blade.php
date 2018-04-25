@extends('layouts.base', ['categories' => $categories])

@section('title', 'FAQs')

@section('resources')
@parent
<link rel="stylesheet" href="{{ asset('css/faq.css') }}">
@endsection

@section('content')

    <h3 class="border-bottom pb-1 mb-5 mt-5">Frequently Asked Questions (FAQ): </h3>

    <!-- Questions and answers -->
    <!-- Privacy -->
    <h4>Privacy:</h4>
    <div id="accordionPrivacy" class="mt-3 mb-5">
        <div class="card">
            <div class="card-header" id="heading1">
                <a class="btn-link" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                    <h4 class="dropdown-toggle"> Do you use my personal data for publicity?</h4>
                </a>
            </div>
            <div id="collapse1" class="collapse" aria-labelledby="heading1" data-parent="#accordionPrivacy">
                <div class="card-body">
                    No we do not. The information we store is only used to help the user with his transactions.
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header" id="headin11">
                <a class="btn-link" data-toggle="collapse" data-target="#collapse11" aria-expanded="true" aria-controls="collapse11">
                    <h4 class="dropdown-toggle"> Is all my data deleted after I cancel my account?</h4>
                </a>
            </div>
            <div id="collapse11" class="collapse" aria-labelledby="headin11" data-parent="#accordionPrivacy">
                <div class="card-body">
                    All of your data is deleted except your email and username, which is used to mitigate ban evasion and fraud.
                </div>
            </div>
        </div>
    </div>

    <h4>Auctions:</h4>
    <div id="accordionAuctions" class="mt-3 mb-5">
        <div class="card">
            <div class="card-header" id="heading2">
                <a class="btn-link collapsed" data-toggle="collapse" data-target="#collapse2" aria-expanded="true" aria-controls="collapse2">
                    <h4 class="dropdown-toggle"> What should I do if my item arrives with a defect, is the wrong item or the item never arrives?</h4>
                </a>
            </div>
            <div id="collapse2" class="collapse" aria-labelledby="heading2" data-parent="#accordionAuctions">
                <div class="card-body">
                    You should open a complaint in the system if no more than 30 days have passed since your transaction. There you can try to resolve the problem with the seller, or If that doen't work out you are then put into contact with our team to see what we can do.
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header" id="heading3">
                <a class="btn-link collapsed" data-toggle="collapse" data-target="#collapse3" aria-expanded="true" aria-controls="collapse3">
                    <h4 class="dropdown-toggle"> What do I need to do after I win an auction or buy an item?</h4>
                </a>
            </div>
            <div id="collapse3" class="collapse" aria-labelledby="heading3" data-parent="#accordionAuctions">
                <div class="card-body">
                    You are put into contact with the seller through our messaging system in order to complete your transaction. If you successfully complete the transaction you should confirm it in the auction system.
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header" id="heading5">
                <a class="btn-link collapsed" data-toggle="collapse" data-target="#collapse5" aria-expanded="true" aria-controls="collapse5">
                    <h4 class="dropdown-toggle"> Are the sellers verified?</h4>
                </a>
            </div>
            <div id="collapse5" class="collapse" aria-labelledby="heading5" data-parent="#accordionAuctions">
                <div class="card-body">
                    The sellers are regular people who have put their items up for auction. To establish their trustworthiness you can look at their rating, which tells you the impression of past clients on the seller, or you can contact the seller directly.
                </div>
            </div>
        </div>
    </div>

    <h4>Administration:</h4>
    <div id="accordionAdmin" class="mt-3 mb-5">
        <div class="card">
            <div class="card-header" id="heading31">
                <a class="btn-link collapsed" data-toggle="collapse" data-target="#collapse31" aria-expanded="true" aria-controls="collapse31">
                    <h4 class="dropdown-toggle"> What can I do if i see inappropriate, offensive or abusive content on auction or feedback?</h4>
                </a>
            </div>
            <div id="collapse31" class="collapse" aria-labelledby="heading31" data-parent="#accordionAdmin">
                <div class="card-body">
                    You can report the piece of content so that our moderation team can review it and potentially remove it.
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header" id="heading32">
                <a class="btn-link collapsed" data-toggle="collapse" data-target="#collapse32" aria-expanded="true" aria-controls="collapse32">
                    <h4 class="dropdown-toggle"> What can I do if my account is banned?</h4>
                </a>
            </div>
            <div id="collapse32" class="collapse" aria-labelledby="heading32" data-parent="#accordionAdmin">
                <div class="card-body">
                    You can try to appeal your ban to a administrator. He can decide to unban you or reduce your ban duration.
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header" id="heading33">
                <a class="btn-link collapsed" data-toggle="collapse" data-target="#collapse33" aria-expanded="true" aria-controls="collapse33">
                    <h4 class="dropdown-toggle"> What is the maximum ban duration?</h4>
                </a>
            </div>
            <div id="collapse33" class="collapse" aria-labelledby="heading33" data-parent="#accordionAdmin">
                <div class="card-body">
                    A ban can be permanent.
                </div>
            </div>
        </div>
    </div>

@endsection
