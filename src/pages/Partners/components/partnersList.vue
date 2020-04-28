<template>
    <q-item
      clickable
      v-ripple
      dense
      @click="clickMe"
    >
      <q-item-section
        v-for="(partnerItem, i) in partner.getListModel()"
        :key="i"
        :avatar="partnerItem.type === 'avatarInitials'"
        :class="partnerItem.class"
      >
        <component
          :is="$getComponent(partnerItem.type)"
          v-bind="partnerItem"
        ></component>
      </q-item-section>
    </q-item>
</template>

<script>
  export default {
    name: 'PartnersList',
    props: {
      partner:{
        type: Object,
        requiered: true
      }
    },

    methods:{
      clickMe(){
        this.$emit('click');
      }
    }
  }
</script>