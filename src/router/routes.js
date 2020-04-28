import Login from 'pages/Login/Login.vue';
import Register from 'pages/Register/Register.vue';
import Layout from 'pages/layouts/MainLayout.vue';
import Error404 from 'pages/Error404.vue';
import Index from 'pages/Index.vue';
import Partners from 'pages/Partners/Partners.vue';
import Partner from 'pages/Partner/Partner.vue';
import Orders from 'pages/Orders/Orders.vue';
import Order from 'pages/Order/Order.vue';
import Report from 'pages/Report/Report.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'login',
        component: Login,
        name: Login.name
      },
      {
        path: 'register',
        component: Register,
        name: Register.name
      },
      {
        path: '',
        component: Index,
        name: Index.name,
        drowerSettings:{
          title: Index.name,
          icon: 'home',
          to: '/'
        }
      },
      {
        path: 'partners',
        component: Partners,
        name: Partners.name,
        drowerSettings:{
          title: Partners.name,
          icon: 'list',
          to: '/partners'
        },
        meta:{
          name: Partners.name,
          description: 'Pregled svih partnera',
        },
        children:[
          {
            path: 'partner',
            component: Partner,
            name: Partner.name,
            meta:{
              name: 'Partner',
            },
            children:[
              {
                path: 'orders',
                component: Orders,
                name: Orders.name,
                meta:{
                  name: 'Porudžbine',
                },
                children:[
                  {
                    path: 'order',
                    component: Order,
                    name: Order.name,
                    meta:{
                      name: 'Porudžbina',
                    }
                  }
                ]
              },
            ]
          }
        ]
      },
      // {
      //   path: 'report',
      //   component: Report,
      //   name: Report.name,
      //   drowerSettings:{
      //     title: Report.name,
      //     icon: 'description',
      //     to: '/report'
      //   },
      //   meta:{
      //     name: 'Izveštaj',
      //     description: 'Izveštavanja',
      //   }
      // },
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: Error404
  });
}

export default routes;