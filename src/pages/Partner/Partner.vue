<template>
  <q-page>
    <div
      v-if="this.$router.currentRoute.name === 'Partner' && partner.id"
    > 
      <component
        :is="$getComponent('partnerForm')"
        v-bind.sync="{ partner }"
        @ordersView="ordersView"
        @partnerUpdate="partnerUpdate($event)"
      ></component>
    </div>

    <router-view class="router-view-main-custom" />
  </q-page>
</template>

<script>
  export default {
    name: 'Partner',

    beforeMount() {
      this.$store.dispatch('partner/setPartner', this.$router.currentRoute.query.partnerId, { root: true });
    },

    destroyed(){
      this.$store.dispatch('partner/destroyPartner', null, { root: true });
    },

    computed: {
      partner(){
        return this.$store.getters['partner/getPartner'];
      }
    },

    methods: {
      ordersView(){
        this.$router.push({
          path: `/partners/partner/orders`,
          query: { partnerId: this.partner.id }
        })
      },

      async partnerUpdate(partner){
        const res = await this.$store.dispatch('partner/updatePartner', partner, {root: true});
      }
    },
  }
</script>
