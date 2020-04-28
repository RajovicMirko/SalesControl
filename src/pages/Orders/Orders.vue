<template>
  <q-page>
    <div
      v-if="this.$router.currentRoute.name === 'Orders'"
    >
      <!-- BANNER -->
      <component
        :is="$getComponent('bnr')"
        :title="bannerTitle"
      ></component>

      <!-- ORDERS LIST -->
      <q-list separator bordered>
        <component
          v-for="order in orders"
          :key="order.id"
          :is="$getComponent('ordersList')"
          v-bind="{ order }"
          @click="orderView($event)"
          @deleteOrder="deleteOrder($event)"
        ></component>
      </q-list>
    </div>

    <router-view class="router-view-main-custom" />
  </q-page>
</template>

<script>
  export default {
    name: 'Orders',
    data(){
      return{
        bannerTitle: '',
      }
    },

    computed: {
      partner(){
        return this.$store.getters['partner/getPartner'];
      },

      orders(){
        return this.$store.getters['partner/getOrders'];
      }
    },
    
    beforeMount(){
      this.$reponsiveControl.addFunctions(this.bannerTitleFn);
    },

    methods: {
      bannerTitleFn(){
        this.bannerTitle = this.$winSize === 'big'
          ? `Pregled porudžbina za partnera ${this.partner.name}`
          : `Porudžbine ${this.partner.name}`;
      },

      orderView(order){
        this.$router.push({
          path: `/partners/partner/orders/order`,
          query: { partnerId: this.$router.currentRoute.query.partnerId, orderId: order.id }
        })
      },

      deleteOrder(event){
        console.log('deleteOrder', event);
        
      },

    }

  }
</script>
