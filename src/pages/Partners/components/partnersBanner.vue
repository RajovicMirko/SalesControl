<template>
  <component
    :is="$getComponent('bnr')"
    v-bind="bnrSettup"
  >
    <template v-slot:center>
      <component
        :is="$getComponent('inPut')"
        :value.sync="searchString"
        v-bind="searchSettup"
        @onChange="bannerUpdated"
      ></component>
    </template>
    <template v-slot:center2>
      <component
        :is="$getComponent('check')"
        :value.sync="showActive"
        v-bind="checkSettup"
        @onChange="bannerUpdated"
      ></component>
    </template>
  </component>
</template>

<script>
  export default {
    name: 'PartnersBanner',

    data(){
      return{
        bnrSettup: {
          title: 'Partners',
          titleClass: 'big'
        },

        searchString: "",
        searchSettup:{
          icon: 'search',
          dark: true
        },

        showActive: true,
        checkSettup: {},
      }
    },

    created(){
      this.bannerUpdated();
      this.$reponsiveControl.addFunctions(this.checkSettupFn);
    },

    methods:{
      checkSettupFn(){
        this.checkSettup = {
          label: this.$winSize === 'big' ? 'Show active only' : 'Active',
          leftLabel: true,
          dark: true
        }
      },

      bannerUpdated(){
        //FILTER LOGIC
        let queryString = "";
        if(this.showActive) queryString = `showActive=${this.showActive}`;
        if(this.searchString) queryString += `&searchString=${this.searchString}`;
        if(queryString) queryString = "?" + queryString;
        
        this.$emit('bannerUpdated', queryString);
      }
    }
  }
</script>