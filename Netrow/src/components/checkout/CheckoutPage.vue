

<template>
    <div class="section">
        <h3 class="title">Order Details</h3>
        <br>
        <h4 class="subtitle">Shipping Info</h4>
        <div class="columns is-multiline is-centered">
            <div class="field column is-one-third">
                <label class="label">Name</label>
                <p class="control has-icons-left has-icons-right">
                    <input
                            :class="[highlightNameWithError ? 'input is-danger' : 'input']"
                            type="text"
                            v-model="profile.Nome"
                            @keyup="checkNameOnKeyUp(name)"
                    >
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
                    <input
                            :class="[highlightEmailWithError ? 'input is-danger' : 'input']"
                            type="email"
                            name="emailName"
                            v-model="profile.CDU_CampoVar1"
                            @keyup="checkEmailOnKeyUp(email)"
                            value="alexsmith@gmail.com"
                    >
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
    import { isValidEmail } from '../../validators';
    import { isAnyObjectEmpty } from '../../lib/utils';
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
                }
            };
        },

        methods: {
            createOrder() {
                let requestData = {
                    ... this.profile,
                    Moeda: 'EUR',
                    Tipodoc: 'FA',
                    Serie: 'C',
                    Entidade: 'Sofrio',
                    TipoEntidade: 'C',
                    DataDoc:'12/11/2018',
                    DataVenc:'12/12/2018',
                    Nome: this.name,
                    CamposUtil: [
                        {
                            "Nome": "CDU_CampoVar1",
                            "Valor": this.email
                        },
                        {
                            "Nome": "CDU_CampoVar2",
                            "Valor": this.password
                        }
                    ]
                };

                return HttpClient.instance(console.error)
                    .postJson("Compras/Docs/CreateDocument", requestData);
            },

            checkForm (e) {
                e.preventDefault();

                if (this.name && this.email && isAnyObjectEmpty(this.profile)) {
                    this.highlightEmailWithError = false;
                    this.isFormSuccess = true;

                    this.createUser()
                        .then(data => {
                            this.$store.commit('setUserName', this.name);
                            this.$store.commit('isUserSignedUp', this.isFormSuccess);
                            this.$store.commit('isUserLoggedIn', this.isFormSuccess);
                            this.$store.commit('addUsername', this.profile.Cliente);
                        }).catch(e => {
                        console.error(e);
                        this.$toaster.error("Failed to Update Profile.");
                    });
                } else {
                    this.$toaster.error("Failed to register");
                }

                if (!this.name) {
                    this.highlightNameWithError = true;
                } else {
                    this.highlightNameWithError = false;
                }

                if (!this.email) {
                    this.highlightEmailWithError = true;

                    if (this.email && !isValidEmail(this.email)) {
                        this.emailErrorLabel = this.emailNotValidLabel;
                    }
                } else {
                    this.highlightEmailWithError = false;
                }
            },
            checkNameOnKeyUp (nameValue) {
                if (nameValue) {
                    this.highlightNameWithError = false;
                } else {
                    this.highlightNameWithError = true;
                }
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
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                const username = vm.$store.getters.username;
                HttpClient.instance(console.error)
                    .getProfile(username)
                    .then(profile => {
                        vm.profile = {
                            ... vm.profile,
                            Cliente: username,
                            ... profile
                        }
                    }).catch(e => {
                    console.error(e);
                    vm.$toaster.error("Failed to fetch profile data");
                })
            })
        }
    };


</script>