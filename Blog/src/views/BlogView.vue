<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import axios from 'axios';

import BackButton from '@/components/BackButton.vue';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const db = getFirestore();

const blogId = route.params.id;

const state = reactive({
  blog: {},
  isLoading: true,
  isAdmin: false
});

const deleteContent = async () => {
  try {
    if (window.confirm('Sure wanna delete this post?')) {
      await axios.delete(`/api/blogs/${blogId}`);
      toast.success('Post Deleted');
      router.push('/blogs');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    toast.error('Failed to delete post');
  }
};

// Check if the user is an admin
onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const role = userSnap.data().role || '';
          state.isAdmin = role.toLowerCase() === 'admin';
          console.log('User role:', role); // DEBUG LOG
        } else {
          state.isAdmin = false;
        }
      } catch (err) {
        console.error('Failed to fetch user role:', err);
        state.isAdmin = false;
      }
    } else {
      state.isAdmin = false;
    }
  });

  // Fetch blog data
  (async () => {
    try {
      const { data } = await axios.get(`/api/blogs/${blogId}`);
      state.blog = data;
    } catch (error) {
      console.error('Error fetching blog data:', error);
    } finally {
      state.isLoading = false;
    }
  })();
});

</script>

<template>
  <div class="pt-16 bg-gray-900">
    <BackButton />
  </div>

  <section v-if="!state.isLoading" class="bg-gray-50">
    <div class="container mx-auto py-10 px-6">
      <div class="grid grid-cols-1 gap-6">
        <main>
          <!-- Blog Header -->
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <h1 class="text-3xl font-bold mb-4">{{ state.blog.title }}</h1>
            <p class="text-gray-500 mb-4">{{ state.blog.subtitle }}</p>
          </div>

          <!-- Blog Author Info -->
          <div class="text-gray-500 my-4 flex md:flex-col flex-row justify-center md:justify-between items-center">
            <p class="uppercase font-bold">{{ state.blog.author?.name }}</p>
            <p class="md:py-2 px-4">{{ state.blog.author?.contactEmail }}</p>
            <p class="italic text-xs">{{ state.blog.date }}</p>
          </div>

          <!-- Blog Content -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <p class="text-gray-800 text-lg mb-6">{{ state.blog.content }}</p>
          </div>

          <!-- Manage Buttons (only visible for admin) -->
          <div v-if="state.isAdmin" class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Content</h3>
            <div class="flex flex-col md:flex-row">
              <RouterLink
                :to="`/blogs/edit/${state.blog.id}`"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full mt-4 md:mr-2"
              >
                Edit Content
              </RouterLink>
              <button
                @click="deleteContent"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full mt-4 md:ml-2"
              >
                Delete Content
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </section>
</template>
