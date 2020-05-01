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
      <!-- BANNER IF PARTNER DON'T HAVE ANY ORDER -->
      <component
        v-if="!orders.length"
        :is="$getComponent('bnrNoItemsFound')"
        title="No orders found"
      ></component>

      <!-- ORDERS LIST -->
      <q-list separator bordered>
        <component
          v-for="(order, i) in orders"
          :key="order.id"
          :is="$getComponent('ordersList')"
          v-bind="{ order }"
          :value="String(i + 1)"
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
        this.bannerTitle = `${this.partner.name} orders`;
        return this.$store.getters['partner/getOrders'];
      }
    },
    
    beforeMount(){
      // this.$reponsiveControl.addFunctions(this.bannerTitleFn);
    },

    methods: {
      // bannerTitleFn(){
      //   this.bannerTitle = this.$winSize === 'big'
      //     ? `${this.partner.name} orders`
      //     : `${this.partner.name} orders`;
      // },

      orderView(order){
        this.$router.push({
          path: `/partners/partner/orders/order`,
          query: { partnerId: this.$router.currentRoute.query.partnerId, orderId: order.id }
        })
      },

      deleteOrder(event){
        this.$store.dispatch('partner/deleteOrder', event, { root: true })
      },

    }

  }
</script>
