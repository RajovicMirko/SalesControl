<template>
    <q-card>
        <!-- TITLE -->
        <q-card-section class="q-card-title">
            <component
                :is="$getComponent('cardTitle')"
                :caption="partner.id"
                :title="partner.name || 'New partner'"
            >
                <!-- BIG SCREEN OPTIONS -->
                <template
                    v-slot:buttons
                    v-if="formDisabled"
                >
                    <!-- ORDERS -->
                    <div>
                        <component
                            class="big"
                            :is="$getComponent('btn')"
                            v-bind="btnOrders"
                            @click="ordersView"
                        ></component>
                    </div>
                </template>

                <!-- SMALL SCREEN OPTIONS -->
                <template
                    v-slot:sideActions
                    v-if="this.$winSize === 'small' && formDisabled"
                >
                    <q-list>
                        <q-item
                            v-for="(action, i) in btnListSideActions"
                            :key="i"
                        >
                            <q-item-section clickable @click="action.fn">{{ action.label}}</q-item-section>
                        </q-item>
                    </q-list>
                </template>
            </component>
        </q-card-section>

        <!-- PARTNER FORM -->
        <q-card-section class="q-card-partner-form">
            <q-form
                class="q-form-partner"
                ref="partnerForm"
                @submit="formSave"
                :disabled="formDisabled"
            >
                <component
                    class="q-card-partner-form-items"
                    v-for="(component, i) in formDefinition"
                    :key="i"
                    :is="$getComponent(component.name)"
                    v-bind="component"
                    :name="component.id"
                    :disable="formDisabled || (!formDisabled && component.disable)"
                    :value.sync="partnerModel[component.id]"
                ></component>

                <q-separator class="big" />
                
                <div
                    v-if="!formDisabled"
                    class="q-card-partner-form-actions"
                >
                    <!-- RESET -->
                        <component
                            :is="$getComponent('btn')"
                            v-bind="btnReset"
                            @click="formReset('goBack')"
                        ></component>
                    
                    <q-space v-if="!formDisabled" />

                    <!-- SAVE -->
                        <component
                            v-if="!formDisabled"
                            :is="$getComponent('btn')"
                            type="submit"
                            v-bind="btnSave"
                        ></component>
                </div>

            </q-form>
        </q-card-section>

        <!-- BUTTONS -->
        <q-card-actions
            v-if="formDisabled"
        >
                <!-- EDIT -->
                <component
                    class="big"
                    :is="$getComponent('btn')"
                    v-bind="btnEdit"
                    @click="formEdit"
                ></component>
        </q-card-actions>
    </q-card>
</template>

<script>
  export default {
    name: 'partnerForm',

    props: {
      partner: {
        type: Object,
        required: true
      }
    },

    data(){
      return{
        btnEdit:{},
        btnReset:{},
        btnSave:{},

        btnOrders:{
          color: "positive",
          label: 'View orders',
          icon: 'view_list'
        },
        btnListSideActions:[
          { label: 'Update', fn: this.formEdit },
          { label: 'View orders', fn: this.ordersView },
        ],

        partnerModel: {},
        path: this.$router.currentRoute.fullPath,
      }
    },
    
    beforeMount(){
      this.$reponsiveControl.addFunctions(this.setBtnEdit, this.setBtnReset, this.setBtnSave);
    },

    computed:{
      formDefinition(){
        if(this.partner.id || this.partner.id === ''){
          this.partnerModel = Object.assign({}, this.partner.getModel());
          return Object.assign({}, this.partner.getFormModel());
        }
      },

      formDisabled:{
        get(){
          return this.$store.getters['partner/formDisabled'];
        },
        set(event){
          this.$store.commit('partner/setFormDisabled', event, { root: true });
        }
      }
    },

  methods:{
    setBtnEdit(){
      this.btnEdit = {
        color: "primary",
        label: this.$winSize === 'big' ? 'Update' : '',
        icon: 'edit'
      }
    },
    
    setBtnReset(){
      this.btnReset = {
        color: "negative",
        label: this.$winSize === 'big' ? 'Cancel' : '',
        icon: 'close',
        type: 'reset'
      }
    },
    
    setBtnSave(){
      this.btnSave = {
        color: "positive",
        label: this.$winSize === 'big' ? 'Save' : '',
        icon: 'save',
        type: 'submit'
      }
    },

    ordersView(){
      this.$emit('ordersView');
    },

    formEdit(){
      this.formDisabled = false;
    },

    formReset(type = null){
      if(this.partner.id){
        this.partnerModel = Object.assign({}, this.partner.getModel());
      } else {
        if(type === 'goBack') this.$router.push({ path: `/partners` });
      }
      this.formDisabled = true;
    },

    formSave(evt){
      const frm = this.$refs.partnerForm
      let formObj = {};
      const formComponents = this.partnerModel;

      Object.keys(formComponents).forEach(k => {
        formObj[k] = formComponents[k];
      });

      const dialogObj = {
        title: `${this.partner.id ? 'Update' : 'Insert' } partner`,
        icon: 'warning',
        message: `Are you sure you want to ${this.partner.id ? 'update' : 'insert' } partner?`,
        ok: {
          push: true,
          label: 'Yes',
          color: 'negative'
        },
        cancel: {
          push: true,
          label: 'No',
          color: 'positive'
        },
      }
      
      frm.validate()
        .then(success => {
          if (success) {
            this.$dialog(
              dialogObj,
              ()=>{
                if(this.partner.id){
                  this.$emit('updatePartner', formObj);
                  this.formReset('update');
                } else {
                  this.$emit('insertPartner', formObj);
                  this.formReset('insert');
                }
              },
              ()=>{
                this.formReset();
              }
            )
          }
          else {
            //IF FORM HAS ERRORS
            this.formReset();
          }
        })
    }
  }
}
</script>