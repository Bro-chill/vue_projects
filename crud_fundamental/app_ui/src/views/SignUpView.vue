<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log("Successfully Registered!")
        router.push('/edit')
    })
    .catch((error) => {
        console.log(error.code);
        alert(error.message);
    });
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push("/edit");
        })
        .catch((error) => {
            console.log(error)
        });
};
</script>

<template>
    <h1>Sign Up</h1>
    <p>
        <input class="border-2 border-black" type="text" placeholder="Email" v-model="email">
    </p>
    <p>
        <input class="border-2 border-black" type="text" placeholder="Password" v-model="password">
    </p>
    <p>
        <button class="bg-green-100 px-2 hover:bg-green-500" @click="register">Submit</button>
    </p>
    <p>
        <button class="bg-blue-100 px-2 hover:bg-blue-500" @click="signInWithGoogle">Sign Up with Google</button>
    </p>
</template>