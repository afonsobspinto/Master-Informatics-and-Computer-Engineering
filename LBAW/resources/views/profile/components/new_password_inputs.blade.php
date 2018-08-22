<div class="form-group {{ $errors->has($name_prefix) ? 'has-error' : '' }} mt-4 control-label">
    <label for="{{ $name_prefix }}">{{ $pretty_name }}:</label>
    <div>
        <input id="{{ $name_prefix }}" type="password" class="form-control" name="{{ $name_prefix }}" {{ $required ? 'required' : '' }}>

        @include('components.form_error_msg', [ 'errorName' => $name_prefix])
    </div>
</div>
@php($confirmPass = $name_prefix . '-confirm')
<div class="form-group">
    <label for="{{ $confirmPass }}" class="control-label">Confirm {{ $pretty_name }}:</label>
    <div>
        <input id="{{ $confirmPass }}" type="password" class="form-control" name="{{ $name_prefix . '_confirmation' }}" {{ $required ? 'required' : '' }}>
    </div>
</div>