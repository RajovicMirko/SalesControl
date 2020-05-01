<template>
    <q-item
      clickable
      v-ripple
      dense
      @click="clickMe"
    >
      <q-item-section
        v-for="(orderItem, i) in order.getListModel()"
        :key="i"
        :avatar="orderItem.type === 'avatarInitials'"
        :class="orderItem.class"
      >
        <component
          :is="$getComponent(orderItem.type)"
          :value="value"
          v-bind="orderItem"
        ></component>
      </q-item-section>
      <q-item-section side>
        <component
          :is="$getComponent('btn')"
          v-bind="btnDeleteOrder"
          @click="deleteOrder"
        ></component>
      </q-item-section>
    </q-item>
</template>

<script>
  export default {
    name: 'OrdersList',
    props: {
      order:{
        type: Object,
        requiered: true
      },
      value: {
        type: String,
        default: ''
      }
    },

    data(){
      return{
        btnDeleteOrder: {
          flat: true,
          round: true,
          dense: true,
          icon: 'delete',
          color: 'negative',
          tooltip: 'Obriši porudžbinu'
        }
      }
    },

    methods:{
      clickMe(){
        this.$emit('click', this.order);
      },

      deleteOrder(){
        const dialogObj = {
            title: 'Brisanje porudžbine',
            icon: 'warning',
            iconColor: 'negative',
            message: 'Da li želite da obrišete porudžbinu?',
            ok: {
                push: true,
                label: 'Da',
                color: 'negative'
            },
            cancel: {
                push: true,
                label: 'Ne',
                color: 'positive'
            },
        }
        
        this.$dialog(
          dialogObj,
          ()=>{
            this.$emit('deleteOrder', this.order)
          }
        )
      },

    },

  }
</script>