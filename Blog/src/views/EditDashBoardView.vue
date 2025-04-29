<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const form = reactive({
  title:'',
  subtitle: '',
  content: '',
  date: '',
  author: {
    name: '',
    contactEmail: '',
  }
});

const state = reactive({
  blog: {},
  isLoading: true
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

const blogId = route.params.id;

const handleSubmit = async () => {
  const updatePost = {
    title: form.title,
    subtitle: form.subtitle,
    content: form.content,
    date: form.date,
    author: {
      name: form.author.name,
      contactEmail: form.author.contactEmail
    }
  };

  try {
    const response = await axios.put(`/api/blogs/${blogId}`, updatePost);
    toast.success('Post Updated');
    router.push(`/blogs/${response.data.id}`);
  } catch (error) {
    console.error('Error Updating Post',error);
    toast.error('Failed To Update Post');
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/blogs/${blogId}`);
    state.blog = response.data
    // Populate inputs
    form.title = state.blog.title;
    form.subtitle = state.blog.subtitle;
    form.content = state.blog.content;
    form.date = state.blog.date;
    form.author.name = state.blog.author.name;
    form.author.contactEmail = state.blog.author.contactEmail
  } catch (error) {
    console.error('Error Fetching Data',error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">
            Edit Post
          </h2>

          <div class="mb-4">
            <label
            for="type"
            class="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              v-model="form.title"
              id="title"
              name="title"
              placeholder="Title"
              class="border rounded-full py-2 px-3 mb-2"
              required/>
          </div>
          
          <div class="mb-4">
            <label
            for="type"
            class="block text-gray-700 font-bold mb-2">
              Subtitle
            </label>
            <input
              type="text"
              v-model="form.subtitle"
              id="subtitle"
              name="subtitle"
              placeholder="Title"
              class="border rounded-full py-2 px-3 mb-2 w-full"
              required/>
          </div>

          <div class="mb-4">
            <label
            for="type"
            class="block text-gray-700 font-bold mb-2">
              Content
            </label>
            <textarea
              v-model="form.content"
              id="content"
              name="content"
              placeholder="Add Your Content"
              rows="4"
              class="border rounded w-full py-2 px-3">

            </textarea>
          </div>

          <div class="mb-4">
            <label
            for="type"
            class="block text-gray-700 font-bold mb-2">
              Date
            </label>
            <input
              type="text"
              v-model="form.date"
              id="date"
              name="date"
              placeholder="Date"
              class="border rounded-full py-2 px-3 mb-2"
              required/>
          </div>

          <div class="mb-4">
            <label
            for="type"
            class="block text-gray-700 font-bold mb-2">
              Author Name
            </label>
            <input
              type="text"
              v-model="form.author.name"
              id="authorname"
              name="authorname"
              placeholder="Author Name"
              class="border rounded-full py-2 px-3 mb-2"
              required/>
          </div>

          <div class="mb-4">
            <label
            for="type"
            class="block text-gray-700 font-bold mb-2">
              Author Email
            </label>
            <input
              type="text"
              v-model="form.author.contactEmail"
              id="contactEmail"
              name="contactEmail"
              placeholder="Author Email"
              class="border rounded-full py-2 px-3 mb-2"
              required/>
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>