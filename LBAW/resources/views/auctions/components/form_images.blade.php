
<div class="form-group row">
    <div class="col-3"></div>
    <div class="col-9" id="images-container">
    @foreach($images as $image)
        <img class="form-picture" src="{{ $image }}" alt="Auction Image" title="Auction Image">
    @endforeach
    </div>
</div>

<div class="form-group row">
    <label for="photos-input" class="col-3 col-form-label">Photos</label>
    <div class="col-9">
        <input type="file" class="form-control-file" id="photos-input" name="photos-input[]" accept="image/*" multiple>
    </div>
    @include('components.form_error_msg', ['errorName' => 'photos-input.*'])
</div>