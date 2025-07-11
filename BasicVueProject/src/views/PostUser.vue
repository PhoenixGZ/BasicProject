<template>
  <div>
    <h2>Add User</h2>
    <form @submit.prevent="submitUser">
      <div>
        <label>Name:</label>
        <input v-model="name" type="text" required />
      </div>
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>
      <button type="submit">Submit</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const submitUser = async () => {
  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value })
    })

    if (!res.ok) throw new Error('Failed to create user')

    message.value = 'User created successfully!'
    name.value = ''
    email.value = ''
  } catch (err) {
    console.error(err)
    message.value = 'Error creating user'
  }
}
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