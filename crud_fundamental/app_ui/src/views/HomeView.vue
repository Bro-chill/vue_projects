<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiUrl = "http://127.0.0.1:8000/items"
const items = ref([])
const newName = ref('')
const newDescription = ref('')

async function fetchItems() {
    try {
        const response = await axios.get(apiUrl)
        items.value = response.data
    } catch (error) {
        console.error("Error fetching items", error)
    }
}

onMounted(fetchItems)
</script>

<template>
    <div class="container mx-auto p-4">
        <h1 class="text-4xl text-center font-bold text-blue-600 mb-4">CRUD Application</h1>
        <h2 class="text-xl font-bold mb-2">Items</h2>
        <ul class="space-y-4">
            <li v-for="item in items" :key="item.id" class="bg-white p-4 shadow-md rounded">
                <strong>{{ item.name }}</strong> - {{ item.description }}
            </li>
        </ul>
    </div>
</template>