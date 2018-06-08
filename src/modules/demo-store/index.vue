<template>
  <div id="demoStore">
    <ProductList/>
    <hr>
    <ShoppingCart/>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList";
import ShoppingCart from "@/components/ShoppingCart";
export default {
  name: "demoStore",
  components: {
    ProductList,
    ShoppingCart
  }
};
</script>
