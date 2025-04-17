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

async function createItem() {
    if (!newName.value || !newDescription.value) return

    try {
        await axios.post(apiUrl, {
            id: Date.now(),
            name: newName.value,
            description: newDescription.value
        })
        newName.value = ''
        newDescription.value = ''
        fetchItems()
    } catch (error) {
        console.error("Error creating item", error)
    }
}

async function deleteItem(id) {
    try {
        await axios.delete(`${apiUrl}/${id}`)
        fetchItems()
    } catch (error) {
        console.error("Error deleting item", error)
    }
}

function editItem(id, name, description) {
    const newNamePrompt = prompt("Edit name", name)
    const newDescriptionPrompt = prompt("Edit description", description)

    if (newNamePrompt && newDescriptionPrompt) {
        axios.put(`${apiUrl}/${id}`, {
            id,
            name: newNamePrompt,
            description: newDescriptionPrompt
        }).then(fetchItems)
    }
}

onMounted(fetchItems)
</script>

<template>
    <div class="container mx-auto p-4">
        <h1 class="text-4xl text-center font-bold text-blue-600 mb-4">CRUD Application</h1>

        <div class="mb-4">
            <input v-model="newName" type="text" class="border p-2 mr-2" placeholder="Item Name" />
            <input v-model="newDescription" type="text" class="border p-2 mr-2" placeholder="Item Description" />
            <button @click="createItem" class="bg-blue-500 text-white p-2 rounded">Create Item</button>
        </div>

        <h2 class="text-xl font-bold mb-2">Items</h2>
        <ul class="space-y-4">
            <li v-for="item in items" :key="item.id" class="bg-white p-4 shadow-md rounded">
                <strong>{{ item.name }}</strong> - {{ item.description }}
                <button @click="deleteItem(item.id)" class="bg-red-500 text-white p-1 ml-4 rounded">Delete</button>
                <button @click="editItem(item.id, item.name, item.description)" class="bg-yellow-500 text-white p-1 ml-2 rounded">Edit</button>
            </li>
        </ul>
    </div>
</template>
