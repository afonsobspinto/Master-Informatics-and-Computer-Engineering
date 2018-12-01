<template>
    <div class="section">
      <div class="card">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g Alex Smith">
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" placeholder="e.g. alexsmith@gmail.com">
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" placeholder="e.g. Str0ngestP@ssw0rdEver">
          </div>
        </div>
        <div class="field">
          <label class="label">Phone</label>
          <div class="control">
            <input class="input" type="number" placeholder="e.g. 920546432">
          </div>
        </div>
        <div class="field">
          <label class="label">Address</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. Rom D. Dom">
          </div>
        </div>
        <div class="field">
          <label class="label">City</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. Porto">
          </div>
        </div>
        <div class="field">
          <label class="label">Zip-Code</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. 1111-231">
          </div>
        </div>
        <div class="field">
          <label class="label">Country</label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g. Portugal">
          </div>
        </div>
        <div class="field">
          <label class="label">Fiscal Number</label>
          <div class="control">
            <input class="input" type="number" placeholder="e.g. 241241234">
          </div>
        </div>
      </div>
        <div class="text-center"><button class="btn btn-primary btn-sx mt-3" type="button">Update</button></div>
  </div>
</template>

<script>
export default {
  name: 'account-component',
  data () {
    return {

    };
  }
};
</script>