<template>
  <div class="p-4 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Envelope Budgeting</h2>

    <!-- Current Income -->
    <div class="mb-4">
      <p class="text-lg font-semibold">Available Income: <span class="text-green-600">\${{ income }}</span></p>
    </div>

    <!-- Add Income -->
    <div class="mb-6">
      <form @submit.prevent="addIncome">
        <input v-model.number="incomeToAdd" type="number" placeholder="Add Income" class="border p-2 mr-2 w-40" />
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Add</button>
      </form>
    </div>

    <!-- Envelopes -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Envelopes</h3>
      <ul>
        <li
          v-for="envelope in envelopes"
          :key="envelope._id"
          class="flex justify-between items-center border-b py-2"
        >
          <span>{{ envelope.name }}</span>
          <span>\${{ envelope.amount }}</span>
        </li>
      </ul>
    </div>

    <!-- Allocate Income -->
    <div class="mb-6">
      <h3 class="text-md font-semibold mb-1">Move Income to Envelope</h3>
      <form @submit.prevent="allocateIncome" class="flex flex-wrap gap-2">
        <select v-model="selectedEnvelopeId" class="border p-2 w-full sm:w-1/2">
          <option disabled value="">Select Envelope</option>
          <option v-for="env in envelopes" :key="env._id" :value="env._id">{{ env.name }}</option>
        </select>
        <input v-model.number="amountToAllocate" type="number" placeholder="Amount" class="border p-2 w-full sm:w-1/2" />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded w-full">Allocate</button>
      </form>
    </div>

    <!-- Spend from Envelope -->
    <div>
      <h3 class="text-md font-semibold mb-1">Spend from Envelope</h3>
      <form @submit.prevent="spendFromEnvelope" class="flex flex-wrap gap-2">
        <select v-model="selectedSpendEnvelopeId" class="border p-2 w-full sm:w-1/2">
          <option disabled value="">Select Envelope</option>
          <option v-for="env in envelopes" :key="env._id" :value="env._id">{{ env.name }}</option>
        </select>
        <input v-model.number="amountToSpend" type="number" placeholder="Amount" class="border p-2 w-full sm:w-1/2" />
        <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded w-full">Spend</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const income = ref(0)
const envelopes = ref<any[]>([])

const incomeToAdd = ref<number | null>(null)
const selectedEnvelopeId = ref('')
const amountToAllocate = ref<number | null>(null)

const selectedSpendEnvelopeId = ref('')
const amountToSpend = ref<number | null>(null)

const fetchEnvelopes = async () => {
  const res = await fetch('http://localhost:3000/envelope')
  const data = await res.json()
  console.log(data)
  income.value = data.amount.amount || 0
  envelopes.value = data.envelopes || []
}

const addIncome = async () => {
  if (!incomeToAdd.value) return
  await fetch('http://localhost:3000/envelope/income', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: incomeToAdd.value }),
  })
  incomeToAdd.value = null
  fetchEnvelopes()
}

const allocateIncome = async () => {
  if (!selectedEnvelopeId.value || !amountToAllocate.value) return
  await fetch('http://localhost:3000/envelope/allocate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      envelopeId: selectedEnvelopeId.value,
      amount: amountToAllocate.value,
    }),
  })
  selectedEnvelopeId.value = ''
  amountToAllocate.value = null
  fetchEnvelopes()
}

const spendFromEnvelope = async () => {
  if (!selectedSpendEnvelopeId.value || !amountToSpend.value) return
  await fetch('http://localhost:3000/envelope/spend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      envelopeId: selectedSpendEnvelopeId.value,
      amount: amountToSpend.value,
    }),
  })
  selectedSpendEnvelopeId.value = ''
  amountToSpend.value = null
  fetchEnvelopes()
}

onMounted(() => {
  fetchEnvelopes()
})
</script>

<style scoped>
input,
select {
  border-radius: 0.375rem;
}
</style>