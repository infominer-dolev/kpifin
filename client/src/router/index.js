import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/manage',
    name: 'manage',
    component: ()=> import ('../views/ManagmentView.vue')
  },
  {
    path: '/',
    name: 'main',
    component: ()=> import ('../views/MainPage.vue')
  },
  {
    path:'/login',
    name: 'login',
    component: ()=> import ('../views/LoginView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach(async (to) => {  
//   if (to.name==='login' ) {
//     return;
//   }

//   let isLoggedInVar = await LoginHandler.isLoggedIn();
//   if (!isLoggedInVar) {
//     return { path: '/login' }
//   }
// });
export default router