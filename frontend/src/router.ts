import Vue from 'vue';
import Router from 'vue-router';

import RouterComponent from './components/RouterComponent.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "start" */ './views/main/Start.vue'),
      children: [
        {
          path: 'login',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
        },
        {
          path: 'recover-password',
          component: () => import(/* webpackChunkName: "recover-password" */ './views/PasswordRecovery.vue'),
        },
        {
          path: 'reset-password',
          component: () => import(/* webpackChunkName: "reset-password" */ './views/ResetPassword.vue'),
        },
        {
          path: 'main',
          component: () => import(/* webpackChunkName: "main" */ './views/main/Main.vue'),
          children: [
            {
              path: 'dashboard',
              component: () => import(/* webpackChunkName: "main-dashboard" */ './views/main/Dashboard.vue'),
            },
            {
              path: 'properties',
              component: RouterComponent,
              redirect: 'all',
              children: [
                {
                  path: '',
                  redirect: 'all',
                },
                {
                  path: 'all',
                  component: () => import(
                    /* webpackChunkName: "main-properties" */ './views/main/property/AdminProperties.vue'),
                },
                {
                  path: 'edit/:id',
                  name: 'main-properties-edit',
                  component: () => import(
                    /* webpackChunkName: "main-properties-edit" */ './views/main/property/EditProperty.vue'),
                },
                {
                  path: 'create',
                  name: 'main-properties-create',
                  component: () => import(
                    /* webpackChunkName: "main-properties-create" */ './views/main/property/CreateProperty.vue'),
                },
              ],
            },
            {
              path: 'stations',
              component: RouterComponent,
              redirect: 'all',
              children: [
                {
                  path: '',
                  redirect: 'all',
                },
                {
                  path: 'all',
                  component: () => import(
                    /* webpackChunkName: "main-stations" */ './views/main/station/AdminStations.vue'),
                },
                {
                  path: 'edit/:id',
                  name: 'main-stations-edit',
                  component: () => import(
                    /* webpackChunkName: "main-stations-edit" */ './views/main/station/EditStation.vue'),
                },
                {
                  path: 'create',
                  name: 'main-stations-create',
                  component: () => import(
                    /* webpackChunkName: "main-stations-create" */ './views/main/station/CreateStation.vue'),
                },
                {
                  path: 'download',
                  name: 'main-stations-download',
                  component: () => import(
                    /* webpackChunkName: "main-stations-download" */ './views/main/station/Download.vue'),
                },
              ],
            },
            {
              path: 'profile',
              component: RouterComponent,
              redirect: 'profile/view',
              children: [
                {
                  path: 'view',
                  component: () => import(
                    /* webpackChunkName: "main-profile" */ './views/main/profile/UserProfile.vue'),
                },
                {
                  path: 'edit',
                  component: () => import(
                    /* webpackChunkName: "main-profile-edit" */ './views/main/profile/UserProfileEdit.vue'),
                },
                {
                  path: 'password',
                  component: () => import(
                    /* webpackChunkName: "main-profile-password" */ './views/main/profile/UserProfileEditPassword.vue'),
                },
              ],
            },
            {
              path: 'admin',
              component: () => import(/* webpackChunkName: "main-admin" */ './views/main/admin/Admin.vue'),
              redirect: 'admin/users/all',
              children: [
                {
                  path: 'users',
                  redirect: 'users/all',
                },
                {
                  path: 'users/all',
                  component: () => import(
                    /* webpackChunkName: "main-admin-users" */ './views/main/admin/AdminUsers.vue'),
                },
                {
                  path: 'users/edit/:id',
                  name: 'main-admin-users-edit',
                  component: () => import(
                    /* webpackChunkName: "main-admin-users-edit" */ './views/main/admin/EditUser.vue'),
                },
                {
                  path: 'users/create',
                  name: 'main-admin-users-create',
                  component: () => import(
                    /* webpackChunkName: "main-admin-users-create" */ './views/main/admin/CreateUser.vue'),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/*', redirect: '/',
    },
  ],
});
