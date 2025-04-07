import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobsView from "@/views/JobsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import JobView from "@/views/JobView.vue";
import AddJob from "@/views/AddJobView.vue";
import EditJob from "@/views/EditJobView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/jobs',
            name: 'jobsView',
            component: JobsView
        },
        {
            path: '/jobs/:id',
            name: 'job',
            component: JobView
        },
        {
            path: '/jobs/add',
            name: 'addJob',
            component: AddJob
        },
        {
            path: '/jobs/edit/:id',
            name: 'editJob',
            component: EditJob
        },
        {
            path: '/:catchAll(.*)',
            name: 'notFoundView',
            component: NotFoundView
        }
    ],
});

export default router;