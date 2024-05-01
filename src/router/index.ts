import VerfiyView from "@/view/VerfiyView.vue";
import AboutView from "@/view/AboutView.vue";
import { createRouter, createWebHistory } from "vue-router";
import VerfiySuccessView from "@/view/VerfiySuccessView.vue";
import HomeView from "@/view/HomeView.vue";
import AddRepairView from "@/view/AddRepairView.vue";
import HelpView from '@/view/HelpView.vue' 
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/about', // 重定向到/about路径
        },
        {
            path: '/about',
            name: "about",
            component: AboutView,
            meta: {
                title: "Home",
            },
        },
        {
          path: '/verfiy',
          name: 'verfiy',
          component: VerfiyView,
          meta: {
            title: '凭证',
          },
        },
        {
          path:'/verfiy/success',
          name:'success',
          component:VerfiySuccessView
        },
        {
            path: '/home',
            name: "home",
            component: HomeView,
            meta: {
                title: "主页"
            },
        },
        {
            path: '/add-repair',
            name: "add-repair",
            component: AddRepairView,
            meta: {
                title: "登记"
            },
        },
        {
            path: '/help',
            name: "帮助",
            component: HelpView,
            meta: {
                title: "登记"
            },
        },
    ]
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (to.name === 'verfiy' && isLoggedIn === 'true') {
      next('/verfiy');
    }else if(to.name === 'home' && isLoggedIn === 'false') {
        next('/about');
    }else if(to.name === 'success' && isLoggedIn === 'true'){
        next('/home')
    } else{
        next();
    }
  });

export default router;
