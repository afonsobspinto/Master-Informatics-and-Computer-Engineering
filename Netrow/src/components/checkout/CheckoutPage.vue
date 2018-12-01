

<template>
    <div class="section">
        <h3 class="title">Order Details</h3>
        <br>
        <h4 class="subtitle">Shipping Info</h4>
        <div class="columns is-multiline is-centered">
            <div class="field column is-one-third">
                <label class="label">Name</label>
                <div class="control">
                    <label>
                        <input class="input" type="text" value="Alex Smith">
                    </label>
                </div>
            </div>
            <div class="field column is-one-third">
                <label class="label">Email</label>
                <div class="control">
                    <label>
                        <input class="input" type="email" value="alexsmith@gmail.com">
                    </label>
                </div>
            </div>
            <div class="field column is-one-third">
                <label class="label">Phone</label>
                <div class="control">
                    <label>
                        <input class="input" type="number" value="920546432">
                    </label>
                </div>
            </div>
            <div class="field column is-one-fifth">
                <label class="label">Address</label>
                <div class="control">
                    <label>
                        <input class="input" type="text" value="Rom D. Dom">
                    </label>
                </div>
            </div>
            <div class="field column is-one-fifth">
                <label class="label">City</label>
                <div class="control">
                    <label>
                        <input class="input" type="text" value="Porto">
                    </label>
                </div>
            </div>
            <div class="field column is-one-fifth">
                <label class="label">Zip-Code</label>
                <div class="control">
                    <label>
                        <input class="input" type="text" value="1111-231">
                    </label>
                </div>
            </div>
            <div class="field column is-one-fifth">
                <label class="label">Country</label>
                <div class="control">
                    <label>
                        <input class="input" type="text" value="Portugal">
                    </label>
                </div>
            </div>
            <div class="field column is-one-fifth">
                <label class="label">Fiscal Number</label>
                <div class="control">
                    <label>
                        <input class="input" type="number" value="241241234">
                    </label>
                </div>
            </div>
        </div>
        <br>
        <div class="columns is-multiline is-centered">
            <div class="control column is-one-fifth"></div>
            <div class="control column is-one-third">
                <h4 class="subtitle">Payment Info</h4>
                <label class="label">Payment Options</label>
                <div class="select">
                    <label>
                        <select class="is-hovered">
                            <option>Bank Transfer</option>
                            <option>Credit Card</option>
                            <option>PayPal</option>
                            <option>Other</option>
                        </select>
                    </label>
                </div>
            </div>
            <br>
            <div class="column">
                <h4 class="subtitle">Your order</h4>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr>
                        <th scope="row">1</th>
                        <td>Product 1</td>
                        <td>3</td>
                        <td>30€</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Product 2</td>
                        <td>1</td>
                        <td>10€</td>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td>TOTAL:</td>
                        <td>100€</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <br>
        <div class="column button is-offset-11">
            <button>Place Order</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'checkout-page-component',
        data () {
            return {

            };
        }
    };
</script>