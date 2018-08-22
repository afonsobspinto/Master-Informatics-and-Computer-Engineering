@if ($errors->has($errorName))
    <span class="help-block">
        <strong>{{ $errors->first($errorName) }}</strong>
    </span>
@endif