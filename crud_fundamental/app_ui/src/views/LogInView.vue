<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Successfully SignIn!")
            router.push('/edit')
        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code){
                case "auth/invalid-email":
                    errMsg.value = "Invalid Email";
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Invalid Password";
                    break;
                case "auth/user-not-found":
                    errMsg.value = "Account doesn't exist";
                    break;
                default:
                    errMsg.value = "Email or Password was Incorrect";
                    break;
            }
        }
    );
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

const resetPassword = () => {
    if (!email.value){
        alert("Please enter your email to reset password");
        return
    }

    sendPasswordResetEmail(getAuth(), email.value)
        .then(() => {
            alert("Password reset email sent!")
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        })
};
</script>

<template>
    <h1>Log In To Your Account</h1>
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
        <button class="bg-blue-100 px-2 hover:bg-blue-500" @click="signInWithGoogle">Sign In with Google</button>
    </p>
    <p>
        <button class="bg-red-100 px-2 hover:bg-red-500" @click="resetPassword">Forget Password</button>
    </p>
</template>