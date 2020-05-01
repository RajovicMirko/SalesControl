<template>
  <q-page>
    <div
      v-if="this.$router.currentRoute.name === 'Partner'"
    > 
      <component
        :is="$getComponent('partnerForm')"
        v-bind.sync="{ partner }"
        @ordersView="ordersView"
        @updatePartner="updatePartner($event)"
        @insertPartner="insertPartner($event)"
      ></component>
    </div>
    
    <router-view class="router-view-main-custom" />
  </q-page>
</template>

<script>
  export default {
    name: 'Partner',
    data(){
      return{
        partnerId: this.$router.currentRoute.query.partnerId
      }
    },

    beforeMount() {
      this.$store.dispatch('partner/setPartner', this.partnerId, { root: true });
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

      async updatePartner(partner){
        const res = await this.$store.dispatch('partner/updatePartner', partner, {root: true});
      },

      async insertPartner(partner){
        const res = await this.$store.dispatch('partner/insertPartner', partner, {root: true});
      }

    },
  }
</script>
