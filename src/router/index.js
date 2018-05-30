import Vue from "vue";
import Router from "vue-router";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/components/DashBoard"),
      meta: { title: "dashboard" }
    },
    {
      path: "/modelo",
      component: () => import("@/components/Modelo"),
      // children: [
      //   {
      //     path: "",
      //     name: "settings",
      //     component: () => import("../components/SettingsForm"),
      //     meta: { title: "Ajustes" }
      //   }
      // ]
    },
    // {
    //   path: "/news",
    //   name: "news",
    //   component: () => import("../components/News"),
    //   meta:{
    //     title:'Noticias'
    //   },
    //   children: [
    //     {
    //       path: "list",
    //       name: "news-list",
    //       component: () => import("../components/NewsList"),
    //       meta: { title: "Todo" }
    //     },
    //     {
    //       path: "form",
    //       name: "news-form",
    //       component: () => import("../components/NewsForm"),
    //       meta: { title: "Nuevo" }
    //     }
    //   ]
    // }
  ]
});