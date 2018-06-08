import Vue from "vue";
import Router from "vue-router";
import {
  firebaseAuth
} from "../config/firebaseConfig";

Vue.use(Router);

const router = new Router({
  routes: [
    // {
    //   path: '*',
    //   redirect: '/login'
    // },
    // {
    //   path: '/',
    //   redirect: '/login'
    // },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import ("@/components/Login"),
      meta: {
        title: 'login'
      }
    },
    {
      path: "/",
      name: "dashboard",
      component: () =>
        import ("@/components/DashBoard"),
      meta: {
        authenticated: true,
        title: "dashboard"
      },
      children: [{
          path: "/model",
          component: () =>
            import ("@/components/Model"),
          meta: {
            title: 'Modelo'
          },
          children: [{
            path: "",
            name: "model-list",
            component: () =>
              import ("@/components/ModelList"),
            meta: {
              title: "Lista de Modelos"
            }
          }]
        },
        {
          path: "/project",
          component: () =>
            import ("@/components/Project"),
          meta: {
            title: 'Proyectos'
          },
          children: [{
            path: "",
            name: "project-list",
            component: () =>
              import ("@/components/ProjectList"),
            meta: {
              title: "Todo"
            }
          }]
        },
        {
          path: "/store",
          component: () =>
            import ("@/components/Store"),
          meta: {
            title: 'Almacen'
          },
          children: [{
            path: "",
            components: {
              default: () =>
                import ("@/components/StoreList"),
              form: () =>
                import ("@/components/StoreForm")
            },
            meta: {
              title: "Todo"
            }
          }]
        }

      ]
    },
  ]
});


// router.beforeEach((to, from, next) => {
//   let user = firebaseAuth().currentUser
//   let authorization = to.matched.some(record => record.meta.authenticated)

//   if (authorization && !user) {
//     next('login')
//   } else if (!authorization && user) {
//     next('home')
//   } else {
//     next()
//   }
// })

export default router