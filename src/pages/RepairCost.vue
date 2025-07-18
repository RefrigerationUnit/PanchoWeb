<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Repair Cost Estimator</h2>
    <form @submit.prevent="getEstimate">
      <!-- Brand -->
      <div class="mb-4">
        <label class="block mb-1 font-semibold" for="brand">Car Brand:</label>
        <select
          id="brand"
          v-model="brand"
          class="w-full border rounded px-3 py-2"
          required
        >
          <option value="" disabled>Select Brand</option>
          <option value="Toyota">Toyota</option>
          <option value="Ford">Ford</option>
          <option value="BMW">BMW</option>
        </select>
      </div>

      <!-- Model -->
      <div class="mb-4">
        <label class="block mb-1 font-semibold" for="model">Car Model:</label>
        <input
          type="text"
          id="model"
          v-model="model"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <!-- Year -->
      <div class="mb-4">
        <label class="block mb-1 font-semibold" for="year">Year:</label>
        <input
          type="number"
          id="year"
          v-model="year"
          class="w-full border rounded px-3 py-2"
          required
          min="1900"
          max="2099"
        />
      </div>

      <!-- Problem Description -->
      <div class="mb-4">
        <label class="block mb-1 font-semibold" for="problem">Describe the Problem:</label>
        <textarea
          id="problem"
          v-model="problem"
          rows="3"
          class="w-full border rounded px-3 py-2"
          required
        ></textarea>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Get Estimate
      </button>
    </form>

    <!-- Result -->
    <div v-if="estimatedCost !== null" class="mt-4 text-lg font-semibold">
      Estimated Repair Cost: €{{ estimatedCost }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const brand = ref('')
const model = ref('')
const year = ref<number | null>(null)
const problem = ref('')
const estimatedCost = ref<number | null>(null)

function getEstimate() {
  // Valor aleatorio entre 50 y 500 euros
  const min = 50
  const max = 500
  estimatedCost.value = Math.floor(Math.random() * (max - min + 1)) + min
}
</script>