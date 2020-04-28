<template>
  <q-page>
    <!-- BREADCRUMBS -->
    <component
      :is="$getComponent('breadcrumb')"
    ></component>

    <!-- IF PAGE NAME IS NOT Partners THEN HIDE THIS PAGE ELEMENTS -->
    <div v-if="this.$router.currentRoute.name === 'Partners'">
      <!-- BANNER -->
      <component
        :is="$getComponent('partnersBanner')"
        @bannerUpdated="bannerUpdated"
      ></component>

      <!-- LIST -->
      <q-list 
          v-if="partners"
          separator bordered
        >
        <component
          :is="$getComponent('partnersList')"
          v-for="partner in partners"
          :key="partner._id"
          v-bind="{ partner }"
          @click="partnerView(partner)"
        ></component>
      </q-list>

      <!-- ADD NEW PARTNER BUTTON -->
      <q-page-sticky position="bottom" :offset="[0, 20]">
        <component
          :is="$getComponent('btn')"
          v-bind="btnDef"
          @click="partnerView()"
        ></component>
      </q-page-sticky>
    </div>

    
    <!-- ROUTER VIEW FOR PARTNERS CHILD PAGES -->
    <router-view class="router-view-main-custom" />
  </q-page>
</template>

<script>
  export default {
    name: 'Partners',

    data(){
      return{
        btnDef:{
          icon: 'add',
          round: true,
          size: '18px'
        }
      }
    },

    created(){
      this.$reponsiveControl.start();
    },
    
    destroyed(){
      this.$reponsiveControl.stop();
    },

    computed:{
      partners(){
        return this.$store.getters['partners/getPartners'];
      }
    },

    methods: {
      bannerUpdated(event){
          this.$store.dispatch('partners/partnersInit', event, { root: true });
      },

      partnerView(partner){
        this.$router.push({
          path: `/partners/partner`,
          query: {
            partnerId: partner ? partner.id : null
          }
        })
      }
    },
  }
</script>
