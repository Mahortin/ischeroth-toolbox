<script setup>
import { ref, onMounted } from 'vue'
import { fetchProducts } from '@/services/productService'
import { fetchAttributes } from '@/services/attributeService'
import { fetchSkills } from '@/services/skillService'

const products = ref([])
const attributes = ref([])
const skills = ref([])
const error = ref(null)

onMounted(async () => {
  try {
    products.value = await fetchProducts()
    attributes.value = await fetchAttributes()
    skills.value = await fetchSkills()
  } catch (err) {
    error.value = err.message
  }
})

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

  <div>
   <h1 class="green">Attribute List</h1>
    
    <div v-if="error">
      <p style="color: red;">Error: {{ error }}</p>
    </div>

    <div v-else-if="attributes.length === 0">
      <p>Loading attributes...</p>
    </div>

    <ul v-else>
      <li v-for="attribute in attributes" :key="attribute.id">
        {{ attribute.name }} — {{ attribute.value }} 
      </li>
    </ul>
    <div>TEST2</div>
  </div>

  <div>
   <h1 class="green">Skill List</h1>
    
    <div v-if="error">
      <p style="color: red;">Error: {{ error }}</p>
    </div>

    <div v-else-if="skills.length === 0">
      <p>Loading skills...</p>
    </div>

    <ul v-else>
      <li v-for="skill in skills" :key="skill.id">
        {{ skill.name }} — {{ skill.value }} — {{ skill.group }} 
      </li>
    </ul>
    <div>TEST2</div>
  </div>
  <!-- End of sanity block-->
</template>

<style scoped></style>
