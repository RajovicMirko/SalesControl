<template>
  <q-page>
    <component
      :is="$getComponent('orderTbl')"
      :title="partner.name"
      v-bind="order.getOrderDataForTable()"
      @updateItem="updateItem($event)"
      @deleteItem="deleteItem($event)"
    ></component>
  </q-page>
</template>

<script>
  export default {
    name: 'Order',

    computed: {
      partner(){
        return this.$store.getters['partner/getPartner'];
      },

      order(){
        return this.$store.getters['partner/getOrderById'](this.$router.currentRoute.query.orderId);
      }
    },

    methods: {
      updateItem(event){
        console.log('update', event);
        
      },

      deleteItem(event){
        console.log('delete', event);
        
      }
    },
  }
</script>
