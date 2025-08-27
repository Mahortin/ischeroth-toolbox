<script setup>
import AttributeComponent from './SingleAttribute.vue'
import { characterStore } from '@/stores/characterStore'
import { ref, onMounted } from 'vue'
import { fetchProducts } from '@/services/productService'

const products = ref([])
const error = ref(null)

onMounted(async () => {
  try {
    products.value = await fetchProducts()
  } catch (err) {
    error.value = err.message
  }
})

const store = characterStore()

function doNothing() {
  window.confirm(store)
}
</script>

<template>
  <!-- Sanity code to prove that container communication works/api to backend works-->
   <!-- remove as soon as data is correctly loaded from backend -->

   <div>
   <h1 class="green">Product List</h1>
    
    <div v-if="error">
      <p style="color: red;">Error: {{ error }}</p>
    </div>

    <div v-else-if="products.length === 0">
      <p>Loading products...</p>
    </div>

    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} — {{ product.price }} €
      </li>
    </ul>
    <div>TEST2</div>
  </div>
  <!-- End of sanity block-->
  
  <div class="column">
    <h2>Attribute</h2>
    <div v-for="attribute in store.attributes" :key="attribute.key" :value="attribute.value">
      <AttributeComponent
        :key="attribute.key"
        :attributeKey="attribute.key"
        :attributeName="attribute.name"
        :attributeValue="attribute.value"
        :increased="attribute.increased"
        @attribute-changed="doNothing"
      ></AttributeComponent>
    </div>
  </div>
</template>

<style scoped></style>
