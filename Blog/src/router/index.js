import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import BlogView from "@/views/BlogView.vue";
import BlogsView from "@/views/BlogsView.vue";
import ContactView from "@/views/ContactView.vue";
import SignUpView from "@/views/SignUpView.vue";
import SignInView from "@/views/SignInView.vue";
import DashboardView from "@/views/DashboardView.vue";
import EditDashBoardView from "@/views/EditDashBoardView.vue";
import AddDashboardView from "@/views/AddDashboardView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/blogs',
            name: 'blogs',
            component: BlogsView
        },
        {
            path: '/blogs/:id',
            name: 'blog',
            component: BlogView
        },
        {
            path: '/blogs/edit/:id',
            name: 'editblog',
            component: EditDashBoardView
        },
        {
            path: '/blogs/add',
            name: 'addblog',
            component: AddDashboardView,
            meta: {
                requiresAuth: true,
                requiresAdmin: true,
            },
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactView
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUpView
        },
        {
            path: '/signin',
            name: 'signin',
            component: SignInView
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView
        },
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
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
    const user = await getCurrentUser();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!user) {
            alert("Access Denied. Please LogIn");
            return next("/login");
        }

        if (to.matched.some((record) => record.meta.requiresAdmin)) {
            const db = getFirestore();
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const isAdmin = docSnap.exists() && docSnap.data().role === "admin";
            if (!isAdmin) {
                alert("Access Denied. Admins Only");
                return next("/");
            }
        }
    }

    next();
});

export default router;