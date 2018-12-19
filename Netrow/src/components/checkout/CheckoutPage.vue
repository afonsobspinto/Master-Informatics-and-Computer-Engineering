

<template>
    <div class="section">
        <h3 class="title">Order Details</h3>
        <br>
        <h4 class="subtitle">Shipping Info</h4>
        <form @submit="checkForm" action="#" method="post">
            <div v-if="isUserLoggedIn">
                <div class="columns is-multiline is-centered">
                    <div class="field column is-one-third">
                        <label class="label">Name</label>
                        <p class="control has-icons-left has-icons-right">
                            <label>
                                <input
                                        :class="[highlightNameWithError ? 'input is-danger' : 'input']"
                                        type="text"
                                        v-model="profile.Nome"
                                        @keyup="checkNameOnKeyUp(name)"
                                >
                            </label>
                            <!-- <span class="icon is-small is-left">
                              <i class="fas fa-user"></i>
                            </span> -->
                            <span v-if="highlightNameWithError !== null" class="icon is-small is-right">
                            <i :class="[highlightNameWithError ? 'fas fa-exclamation-circle' : 'fas fa-check']"></i>
                          </span>
                        </p>
                        <p v-if="highlightNameWithError" class="help is-danger">{{ nameErrorLabel }}</p>
                    </div>
                    <div class="field column is-one-third">
                        <label class="label">Email</label>
                        <p class="control has-icons-left has-icons-right">
                            <label>
                                <input
                                        :class="[highlightEmailWithError ? 'input is-danger' : 'input']"
                                        type="email"
                                        name="emailName"
                                        v-model="profile.CDU_CampoVar1"
                                        @keyup="checkEmailOnKeyUp(email)"
                                        value="alexsmith@gmail.com"
                                >
                            </label>
                            <!-- <span class="icon is-small is-left">
                              <i class="fas fa-envelope"></i>
                            </span> -->
                            <span v-if="highlightEmailWithError !== null" class="icon is-small is-right">
                            <i :class="[highlightEmailWithError ? 'fas fa-exclamation-circle' : 'fas fa-check']"></i>
                          </span>
                        </p>
                        <p v-if="highlightEmailWithError" class="help is-danger">{{ emailErrorLabel }}</p>
                    </div>
                    <div class="field column is-one-third">
                        <label class="label">Phone</label>
                        <div class="control">
                            <label>
                                <input class="input" type="number" v-model="profile.Telefone">
                            </label>
                        </div>
                    </div>
                    <div class="field column is-one-fifth">
                        <label class="label">Address</label>
                        <div class="control">
                            <label>
                                <input class="input" type="text" v-model="profile.Morada">
                            </label>
                        </div>
                    </div>
                    <div class="field column is-one-fifth">
                        <label class="label">City</label>
                        <div class="control">
                            <label>
                                <input class="input" type="text" v-model="profile.Localidade">
                            </label>
                        </div>
                    </div>
                    <div class="field column is-one-fifth">
                        <label class="label">Zip-Code</label>
                        <div class="control">
                            <label>
                                <input class="input" type="text" v-model="profile.CodigoPostal">
                            </label>
                        </div>
                    </div>
                    <div class="field column is-one-fifth">
                        <label class="label">Country</label>
                        <div class="control">
                            <label>
                                <input class="input" type="text" v-model="profile.Pais">
                            </label>
                        </div>
                    </div>
                    <div class="field column is-one-fifth">
                        <label class="label">Fiscal Number</label>
                        <div class="control">
                            <label>
                                <input class="input" type="number" v-model="profile.NumContribuinte">
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
                                <select class="is-hovered" v-model="paymentOption">
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
                            <tr v-for="product in products" :key="product.id">
                                <th scope="row">1</th>
                                <td>{{ product.title }}</td>
                                <td>{{ product.quantity }}</td>
                                <td>{{ product.price }} &euro;</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="column button is-offset-7">
                <router-link :to="{ path: '/CheckoutPage', name: 'checkout-page-component' } ">
                    <span>{{buyLabel}}</span>
                </router-link>
                </div>
                <br>
            </div>
            <div>
                <button class="column button is-success is-offset-10">Place Order</button>
            </div>
        </form>
    </div>
</template>

<script>
    import { isValidEmail } from '../../validators';
    import { HttpClient } from '../../lib/httpClient';

    export default {
        name: 'checkout-page-component',
        data () {
            return {
                namePlaceholder: 'Name*',
                emailPlaceholder: 'Email*',
                nameErrorLabel: 'Name required',
                emailErrorLabel: 'Email required',
                emailNotValidLabel: 'Valid email required',
                highlightNameWithError: null,
                highlightEmailWithError: null,
                isFormSuccess: false,
                profile: {
                    Nome: "",
                    Telefone: "",
                    Morada: "",
                    Localidade: "",
                    CodigoPostal: "",
                    Pais: "",
                    NumContribuinte: "",
                    CDU_CampoVar1: "",
                },
                allProducts: {

                },
                paymentOption: "",
                quantityArray: []
            };
        },

        computed: {
            isUserSignedUp () {
                return this.$store.getters.isUserSignedUp;
            },
            buyLabel() {
                let totalProducts = this.products.length,
                    productsAdded = this.$store.getters.productsAdded,
                    pricesArray = [],
                    productLabel = "",
                    finalPrice = "",
                    quantity = 1;

                console.log(productsAdded);
                productsAdded.forEach(product => {
                    if (product.quantity >= 1) {
                        quantity = product.quantity;
                    }

                    pricesArray.push(product.price * quantity); // get the price of every product added and multiply quantity
                });

                finalPrice = pricesArray.reduce((a, b) => a + b, 0); // sum the prices

                if (totalProducts > 1) {
                    // set plural or singular
                    productLabel = "products";
                } else {
                    productLabel = "product";
                }
                return `Total: ${finalPrice}€`;
            },
            isUserLoggedIn() {
                return this.$store.getters.isUserLoggedIn;
            },
            products() {
                return this.$store.getters.productsAdded;
            }
        },

        methods: {
            getProducts() {
                let productsList = [];
                let i = 0;
                for(i; i< this.products.size; i++){
                    productsList.push(
                        {
                            Artigo: this.products()[i].Artigo,
                            Quantidade: this.products()[i].quantity
                        }
                    )
                }
                return productsList;
            },
            closeModal(reloadPage) {
                this.$store.commit("showCheckoutModal", false);

                if (reloadPage) {
                    window.location.reload();
                }
            },
            getDate(day){
                var today = new Date();
                var dd = today.getDate() + day;
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();

                if(dd<10) {
                    dd = '0'+dd
                }

                if(mm<10) {
                    mm = '0'+mm
                }

                today = mm + '/' + dd + '/' + yyyy;
                return today;
            },
            createOrder() {
                let productsList = this.getProducts();
                let todayDate = this.getDate(0);
                let tomorrowDate = this.getDate(1);
                let requestData = {
                    Linhas: [
                        productsList
                    ],
                    Tipodoc: 'FA',
                    Serie: 'C',
                    Entidade: 'Sofrio',
                    TipoEntidade: 'C',
                    DataDoc: todayDate,
                    DataVenc: tomorrowDate,
                    CamposUtil: [
                        {
                            "Nome": "Payment_Option",
                            "Valor": this.paymentOption
                        }
                    ]
                };

                return HttpClient.instance(console.error)
                    .postJson("Compras/Docs/CreateDocument", requestData);
            },
            checkForm (e) {
                e.preventDefault();

                this.createOrder();
            },
            checkNameOnKeyUp (nameValue) {
                this.highlightNameWithError = !nameValue;
            },
            checkEmailOnKeyUp (emailValue) {
                if (emailValue && isValidEmail(emailValue)) {
                    this.highlightEmailWithError = false;
                } else {
                    this.highlightEmailWithError = true;

                    if (!isValidEmail (emailValue)) {
                        this.emailErrorLabel = this.emailNotValidLabel;
                    }
                }
            },
        }
    };


</script>