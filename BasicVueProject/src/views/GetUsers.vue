<template>
  <div>
    <h2 class="text-lg font-bold mb-2">User List</h2>

    <ul class="mt-4" v-if="users.length">
      <li v-for="user in users" :key="user._id" class="border-b py-1">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>

    <p v-else class="text-gray-600 mt-4">No users found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const users = ref<any[]>([])

const fetchUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/users')
    console.log(res);
    
    if (!res.ok) throw new Error('Failed to fetch users')
    users.value = await res.json()
  } catch (err) {
    console.error('Error fetching users:', err)
  }
}

onMounted(() => {
  fetchUsers()
})
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
