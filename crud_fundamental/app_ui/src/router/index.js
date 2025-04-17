import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import EditView from "@/views/EditView.vue";
import LogInView from "@/views/LogInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/edit',
            name: 'edit',
            component: EditView,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/login',
            name: 'login',
            component: LogInView,
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUpView,
        },
        {
            path: '/:catchAll(.*)',
            name: 'notFoundView',
            component: NotFoundView
        },
    ]
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

router.beforeEach(async (to, from, next) => {
    if(to.matched.some((record) => record.meta.requiresAuth)){
        if(await getCurrentUser()){
            next();
        } else {
            alert("Access Denied. Please LogIn");
            next("/login");
        }
    } else {
        next();
    }
});

export default router;