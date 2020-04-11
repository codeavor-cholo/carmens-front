
const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MyLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') }
  //   ]
  // },
  {
    path: '/',
    component: () => import('pages/home.vue'),
    children: [
       { path: '', component: () => import('pages/front.vue') },
       { path: '/partytray', component: () => import('pages/partytray.vue') },
       { path: '/catering', component: () => import('pages/catering.vue') },
       { path: '/cateringpage', component: () => import('pages/cateringpage.vue') },
       { path: '/reservation/:id', component: () => import('pages/reservation.vue') },
       { path: '/res/:id', component: () => import('pages/res.vue') },
       { path: '/profile', component: () => import('pages/profile.vue') },
       { path: '/profilemob', component: () => import('pages/profilemob.vue') },
       { path: '/checkout', component: () => import('pages/checkout.vue') },
       { path: '/checkoutmob', component: () => import('pages/checkoutmob.vue') },
       { path: '/mobilehome', component: () => import('pages/mobilehome.vue') },
       { path: '/notification', component: () => import('pages/notification.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
