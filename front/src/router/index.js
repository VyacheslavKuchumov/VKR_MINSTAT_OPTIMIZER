import { createRouter, createWebHistory } from "vue-router";
import instance from "@/middlewares";


import HomeView from "@/views/HomeView.vue";
import Register from "@/views/Auth/Register.vue";
import Login from "@/views/Auth/Login.vue";
import ProfileView from "@/views/ProfileView.vue";
import ExercisesView from "@/views/Training/ExercisesView.vue";
import WorkoutView from "@/views/Training/WorkoutView.vue";
import ExercisesInWorkoutView from "@/views/Training/ExercisesInWorkoutView.vue";



const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { auth: true },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: { auth: true },
  },
  {
    path: "/exercises",
    name: "exercises",
    component: ExercisesView,
    meta: { auth: true },
  },
  {
    path: "/workouts",
    name: "workouts",
    component: WorkoutView,
    meta: { auth: true },
  },
  {
    path: "/workout/:id",
    name: "exercises-in-workout",
    component: ExercisesInWorkoutView,
    meta: { auth: true },
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  try {
    const requireAuth = to.matched.some((record) => record?.meta.auth);
    if (requireAuth) {
      const uid = localStorage.getItem("uid");
      const response = await instance.get(`/api/users/${uid}`);
      if (response.status == 200) {
        return next();
      } else if (response.status == 403) {
        return next("/login");
      }
    }
    return next();
  } catch (error) {
    return next("/login");
  }
});

export default router;
