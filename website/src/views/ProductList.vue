<script lang="ts">
import Vue from "vue";
import { tryLogin } from "../lib/authentication";
import { isObjectNotFullySet } from "../lib/utils";

export default Vue.extend({
  name: "ProductList",
  data: function() {
    return {
      products: [
        {
          id: "a",
          name: "X-Trail Ultegra Carbon All-Road Bicycle",
          stock: 50,
          price: 99.99,
          brand: "Ridley",
          image:
            "https://ridleybikes-ridley2.netdna-ssl.com/wp-content/uploads/2017/08/X-Trail_Carbon_XTR01Am_Ultegra.png"
        },
        {
          id: "b",
          name:
            "Westcott 13901 8'' Straight Titanium Bonded Scissors, Grey/Yellow, 2 Per Pack",
          stock: 5,
          price: 15.99,
          brand: "Westcott",
          image:
            "https://images-na.ssl-images-amazon.com/images/I/81KvOHsc2aL._SL1500_.jpg"
        },
        {
          id: "c",
          name:
            "PS4 Controller Wireless Bluetooth with USB cable for Sony Playstation 4",
          stock: 25,
          price: 56.99,
          brand: "Sony",
          image:
            "https://images-na.ssl-images-amazon.com/images/I/81pxebeaaqL._SL1500_.jpg"
        }
      ],
      brands: ["Ridley", "Sony", "Westcott"],
      categories: ["Office Supplies", "Technology", "Transportation"],
      priceRange: {
        min: 0,
        max: 1000
      },
      displayOptions: {
        currentPage: 0,
        amountPerPage: 10,
        orderBy: "name",
        outOfStock: false
      }
    };
  },
  computed: {
    sortedProducts: function() {
      return this.products
        .filter((row, index) => {
          // TODO only show selected prices
          return (
            row.price >= this.priceRange.min && row.price <= this.priceRange.max
          );
        })
        .filter((row, index) => {
          // TODO only show with filters
          return true;
        })
        .sort((a, b) => {
          if (this.displayOptions.orderBy === "name") {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
          }
          if (this.displayOptions.orderBy === "price") {
            if (a.price < b.price) return -1;
            if (a.price > b.price) return 1;
          }
          return 0;
        })
        .filter((row, index) => {
          //only show current page
          let start =
            (this.displayOptions.currentPage - 1) *
            this.displayOptions.amountPerPage;
          let end =
            this.displayOptions.currentPage * this.displayOptions.amountPerPage;
          if (index >= start && index < end) return true;
        });
    }
  }
});
</script>

<template>
  <b-container fluid class="mt-2">
    <b-container fluid class="row bg-info">
      <button class="btn btn-info">All Products</button>
      <button v-for="(category, key) in categories" :key="key" class="btn btn-info">{{category}}</button>
    </b-container>

    <b-container fluid class="row px-0 mt-2" style="min-height:100vh">
      <b-col sm="3" id="ViewOptions" class="pl-0">
        <div class="mb-3 bg-light border border-info h-100 pl-2">
          <p class="font-weight-bold mb-0">Filters</p>

          <div>
            <p class="mb-0">Brand</p>
            <div v-for="(brand, key) in brands" :key="key" class>
              <label for="checkbox">
                <input type="checkbox">
                {{brand}}
              </label>
            </div>
          </div>

          <div>
            <p class="mb-0">Price Range</p>
            <div class="col-12 p-1">
              <input type="number" v-model="priceRange.min" class="col-4 p-1 form-control-sm">
              <p class="col p-0 m-auto d-inline small">&lt; price &lt;</p>
              <input type="number" v-model="priceRange.max" class="col-4 p-1 form-control-sm">
            </div>
          </div>

          <div>
            <label>
              <input type="checkbox" v-model="displayOptions.outOfStock">Include Out of Stock
            </label>
          </div>
        </div>
      </b-col>

      <b-col sm="9" id="ProductsList" class="h-100">
        <b-row
          v-for="product in sortedProducts"
          :key="product.id"
          style="height: 10em"
          class="mb-3 bg-light border border-info"
        >
          <div class="bg-white col-3 row m-0">
            <b-img
              :src="product.image"
              fluid
              alt="product image"
              class="m-auto"
              style="max-height: 9em"
            />
          </div>
          <div class="col h-100 d-flex flex-column justify-content-between">
            <p class="mb-auto font-weight-bold">{{product.name}}</p>
            <!-- TODO link to product page -->
            <div class="m-0 p-0 d-flex flex-row justify-content-between align-items-center">
              <p class="small d-inline m-0">Price: {{product.price}}€</p>
              <div class="mt-auto mx-0 p-0">
                <p class="small d-inline my-0 mr-1">{{product.stock}} units in stock</p>
                <b-button class="btn btn-info m-1">
                  <font-awesome-icon icon="cart-plus"/>
                  <!-- TODO add to cart -->
                </b-button>
              </div>
            </div>
          </div>
        </b-row>

        <b-row class="d-flex">
          <p class="my-auto mr-1">Order By:</p>
          <select v-model="displayOptions.orderBy" size="sm" class="my-auto mr-auto">
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <b-pagination
            class="m-auto"
            align="center"
            size="md"
            :total-rows="products.length"
            v-model="displayOptions.currentPage"
            :per-page="displayOptions.amountPerPage"
          ></b-pagination>
          <select v-model="displayOptions.amountPerPage" size="sm" class="my-auto ml-auto">
            <option>10</option>
            <option>15</option>
            <option>25</option>
          </select>
          <p class="my-auto">results per page</p>
        </b-row>
      </b-col>
    </b-container>
  </b-container>
</template>
