<template>
  <q-page>
    <component
      :is="$getComponent('orderTbl')"
      :title="partner.name"
      v-bind="order.getOrderDataForTable()"
      @insertItem="insertItem($event)"
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
      insertItem(event){
        this.$store.dispatch('partner/insertItem', event, { root: true });
      },

      updateItem(event){
        event.orderId = this.order.id;
        this.$store.dispatch('partner/updateItem', event, { root: true });
      },

      deleteItem(event){
        event.orderId = this.order.id;
        this.$store.dispatch('partner/deleteItem', event, { root: true });
      }
    },
  }
</script>
