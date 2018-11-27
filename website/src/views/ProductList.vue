<script lang="ts">
import Vue from "vue";
import { tryLogin } from "../lib/authentication";
import { isObjectNotFullySet } from '../lib/utils';

export default Vue.extend({
  name: "ProductList",
  data: function() {
      return {
        products:[ 
          { id: "a", name: "X-Trail Ultegra Carbon All-Road Bicycle", stock:"50", price:"99.99",
            image: "https://ridleybikes-ridley2.netdna-ssl.com/wp-content/uploads/2017/08/X-Trail_Carbon_XTR01Am_Ultegra.png" },
          { id: "b", name: "Westcott 13901 8\'\' Straight Titanium Bonded Scissors, Grey/Yellow, 2 Per Pack",
            description:"", stock:"5", price:"15.99",
            image: "https://images-na.ssl-images-amazon.com/images/I/81KvOHsc2aL._SL1500_.jpg" },
          { id: "c", name: "PS4 Controller Wireless Bluetooth with USB cable for Sony Playstation 4",
            stock:"25", price:"56.99", image: "https://images-na.ssl-images-amazon.com/images/I/81pxebeaaqL._SL1500_.jpg" },
        ]
      };
  },
});
</script>

<template>
  
    <b-container fluid class="row">
      <b-col sm="3" id="ViewOptions">
        options
      </b-col>
      <b-col sm="9" id="ProductsList">
        <b-row v-for="product in products" :key="product.id" style="height: 10em" class="mb-3">
          <b-img :src="product.image" thumbnail fluid alt="product image" class="h-100"/>
          
          <h5 class="col-4">{{product.name}}</h5>
          
          <div>
            <button>
              <font-awesome-icon icon="plus-circle" />
              Add to cart
              </button>
            <p>{{product.stock}} units in stock</p>
          </div>
        </b-row>
        
      </b-col>
    </b-container>

</template>
