    <template>
        <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2">Envelopes</h3>
        <ul>
            <li
            v-for="saved in savedConversions"
            :key="saved._id"
            class="flex justify-between items-center border-b py-2"
            >
            <span>{{ saved.name }}</span>&nbsp;
            <span>${{ saved.balance }}</span>
            </li>
        </ul>
        </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// const name = ref('')
// const email = ref('')
// const message = ref('')
var rates = [];

const submit = async () => {
  try {
    const res = await fetch('http://localhost:3000/currency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value })
    })

    if (!res.ok) throw new Error('Failed to create user')

    // message.value = 'User created successfully!'
    name.value = ''
    email.value = ''
  } catch (err) {
    console.error(err)
    // message.value = 'Error creating user'
  }
}

const fetchConversions = async () => {
  const res = await fetch('https://open.er-api.com/v6/latest/USD')
  const data = await res.json()
  console.log(data)
  rates = data.rates;
}

onMounted(() => {
  fetchConversions()
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
}
input {
  margin-bottom: 1rem;
}
button {
  width: 100px;
}
</style>