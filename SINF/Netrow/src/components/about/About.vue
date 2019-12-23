<template>
  <div id="aboutContent">
    <h1 class="title">About Us</h1>
    <h2>The best store in general</h2>
    <div>
      <p class="storeLogo"></p>
      <table style="width:100%">
        <tr>
          <td>email:</td>
          <td>netrow@netrow.com</td>
        </tr>
        <tr>
          <td>phone:</td>
          <td>220 000 000</td>
        </tr>
        <tr>
          <td>Address:</td>
          <td>Rua general, 3200-123, Porto, Portugal</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "about-component"
};
</script>

<style lang="scss" scoped>
.storeLogo {
  background: url("../../../public/assets/netrow-logo.png") no-repeat;
  background-position: 50% 50%;
  background-size: 165px;
  width: 175px * 2;
  height: 35px * 2;
  margin: 0 auto;
}
#aboutContent {
  width: 80%;
  margin: 1em auto;
}
#aboutContent > div {
  background-color: white;
  width: 50%;
  margin: 2em auto;
  padding: 2em 1em 3em 1em;
  border-radius: 1em;
}

tr td:first-child {
  text-align: end;
  width: 25%;
}

tr {
  margin: 0.5em 0;
}
td {
  padding: 0.2em 0.5em;
  width: 50%;
}
</style>
