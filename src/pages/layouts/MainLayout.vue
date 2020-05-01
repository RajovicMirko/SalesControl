
<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated v-if="this.$router.currentRoute.name !== 'Login' && this.$router.currentRoute.name !== 'Register'">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

          <q-toolbar-title>
            <div>{{ pj.productName }}</div>
          </q-toolbar-title>

          <div>
            <component
              :is="$getComponent('btn')"
              v-bind="btnLogoutSetup"
              @click="submitLogout"
            ></component>
          </div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="this.$router.currentRoute.name !== 'Login' && this.$router.currentRoute.name !== 'Register'"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8 row"
        >
          <div>Navigation</div>
          <q-space />
          <div>User: {{ user.name }}</div>
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          exact
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import packageJson from '../../../package.json'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      pj: packageJson,
      isHomeRoute: true,
      breadcrumbs: [],
      essentialLinks: this.$router.options.routes[0].children
        .filter(route => route.drowerSettings)
        .map(route => route.drowerSettings),
      
      btnLogoutSetup:{
        color: "white",
        label: 'Logout',
        icon: 'home',
        flat: true,
      }
    }
  },

  beforeMount() {
      this.isHomeRoute = this.$router.currentRoute.name === 'Home';
      this.breadcrumbs = this.$router.$breadcrumbs;
      this.essentialLinks.push({
        icon: 'code',
        title: 'GitHub project',
        tag: 'a',
        target: '_blank',
        href: 'https://github.com/RajovicMirko/SalesControl'
      })
  },

  computed: {
    user(){
      return this.$store.getters['auth/getUser'];
    }
  },

  methods:{
    submitLogout(){
      this.$store.dispatch('auth/logout', null, { root: true });
    }
  }
}
</script>
