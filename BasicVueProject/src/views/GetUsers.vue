<template>
  <div>
    <h2 class="text-lg font-bold mb-2">User List</h2>

    <ul class="mt-4" v-if="users.length">
      <li
        v-for="user in users"
        :key="user._id"
        class="border-b py-1 cursor-pointer hover:bg-gray-100"
        @click="selectUser(user)"
      >
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>

    <p v-else class="text-gray-600 mt-4">No users found.</p>

    <div v-if="selectedUser" class="mt-6 border-t pt-4">
      <h3 class="font-semibold mb-2">Edit User</h3>
      <form @submit.prevent="updateUser">
        <input
          v-model="selectedUser.name"
          class="border p-1 mr-2"
          placeholder="Name"
        />
        <input
          v-model="selectedUser.email"
          class="border p-1 mr-2"
          placeholder="Email"
        />
        <button
          type="submit"
          class="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Save
        </button>
        <button
          type="button"
          @click="cancelEdit"
          class="ml-2 text-gray-600"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const users = ref<any[]>([])
const selectedUser = ref<any | null>(null)

const fetchUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/users')
    if (!res.ok) throw new Error('Failed to fetch users')
    users.value = await res.json()
  } catch (err) {
    console.error('Error fetching users:', err)
  }
}

const selectUser = (user: any) => {
  // Clone to avoid mutating original list before saving
  selectedUser.value = { ...user }
}

const cancelEdit = () => {
  selectedUser.value = null
}

const updateUser = async () => {
  if (!selectedUser.value) return

  try {
    const res = await fetch(`http://localhost:3000/users/${selectedUser.value._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: selectedUser.value.name,
        email: selectedUser.value.email,
      }),
    })

    if (!res.ok) throw new Error('Failed to update user')
    
    await fetchUsers()
    selectedUser.value = null
  } catch (err) {
    console.error('Error updating user:', err)
  }
}

onMounted(fetchUsers)
</script>
<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>