@extends('layouts.profile_form', ['categories' => $categories, 'countries' => $countries, 'user' => $user])

@section('title', 'Edit Profile')

@section('form-title', 'Edit Profile')

@section('form-url', url('profile', [Auth::id()]))

@section('form-type')
    <input name="_method" type="hidden" value="PUT">
@endsection

@section('countries')
    <option value="" {{ old('country') ? '' : 'selected' }}>All Countries</option>
    @foreach($countries as $country)
        <option value="{{ $country->id }}" {{ ( old('country') ?? $user->getCountryID() ) == $country->id ? 'selected' : '' }}>{{ ucfirst($country->country) }}</option>
    @endforeach
@endsection

@section('cities')
    @foreach($cities as $city)
        <option value="{{ $city->id }}" {{ ( old('city') ?? $user->location ) == $city->id ? 'selected' : '' }}>{{ ucfirst($city->city) }}</option>
    @endforeach
@endsection

@section('form-bottom')
    @include('profile.components.new_password_inputs', [ 'name_prefix' => 'new_password', 'pretty_name' => 'New Password', 'required' => false ])

    <div class="form-group {{ $errors->has('password') ? 'has-error' : '' }} mt-5 control-label">
        <label for="password">Password:</label>
        <div>
            <input id="password" type="password" class="form-control" name="password" required>

            @if ($errors->has('password'))
                <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
            @endif
        </div>
    </div>

    <button type="submit" class="btn btn-primary mx-auto w-50 mb-3 mt-4">Update</button>
@endsection