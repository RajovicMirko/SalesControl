<template>
    <q-table
        ref="orderTbl"
        :title="title"
        :data="order.items"
        :columns="columns"
        :row-key="rowKey"
        dense
    >
        <template v-slot:top-left>
            <q-item style="padding: 0;">
                <q-item-section>
                    <span class="text-h6">Partner: {{ title }}</span>
                    <span class="text-subtitle2">Šifra porudžbine: {{ order.id }}</span>
                    <span class="text-subtitle2">Na dan: {{ order.getOrderDate() }}</span>
                </q-item-section>
            </q-item>
        </template>

        <!-- RIGHT BUTTON -->
        <template v-slot:top-right>
            <component
                :is="$getComponent('btn')"
                v-bind="btnAddItem"
            />
        </template>

        <!-- HEADER -->
        <template v-slot:header="props">
            <q-tr :props="props">
                <q-th auto-width />

                <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                >
                    {{ col.label }}
                </q-th>

                <q-th auto-width />
            </q-tr>
        </template>
        
        <!-- BODY -->
        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td auto-width>
                    <component
                        :is="$getComponent('btn')"
                        v-bind="btnDeleteItem"
                        @click="deleteItem(props.row)"
                    ></component>
                </q-td>
                <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                >
                    {{ col.value }}
                </q-td>
                <q-td auto-width>
                    <component
                        :is="$getComponent('btn')"
                        v-bind="btnEditItem"
                        :icon="props.expand ? 'remove' : 'edit'"
                        @click="propExpend(props)"
                    ></component>
                </q-td>
            </q-tr>
            
            <!-- ROW EXPANSION -->
            <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                    <q-form
                        ref="formItem"
                    >
                        <component
                            v-for="d in props.row.getFormModel()"
                            :key="d.id"
                            :is="$getComponent(d.name)"
                            :value.sync="itemChange[d.id]"
                            v-bind="d"
                        ></component>
                    </q-form>
                    <component
                        :is="$getComponent('btn')"
                        v-bind="btnUpdateItem"
                        @click="updateItem"
                    ></component>
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script>
    export default {
        name: "OrdersTable",
        props: {
            title:{
                type: String,
                default: "Naziv tabele"
            },
            order:{
                type: Object,
                required: true
            },
            rowKey:{
                type: String,
                default: ''
            }
        },

        data(){
            return{
                btnUpdateItem:{},
                btnAddItem: {},
                btnEditItem: {
                    size: "sm",
                    color: "warning",
                    round: true,
                    dense: true
                },
                btnDeleteItem: {
                    icon:"delete",
                    size: "sm",
                    color: "negative",
                    round: true,
                    dense: true
                },
                itemChange: {},

                columns: [
                    {
                        name: 'code',
                        required: true,
                        label: 'Šifra',
                        align: 'left',
                        field: row => row.code,
                        format: val => `${val}`,
                        sortable: true
                    },
                    { name: 'product', label: 'Naziv', field: 'product' },
                    { name: 'quantity', label: 'Količina', field: 'quantity' },
                ],

                orderModelInit: this.order.getModel(),
                orderModel: this.order.getModel(),
            }
        },
    
        beforeMount(){
            this.$reponsiveControl.addFunctions(this.btnAddItemFn, this.btnUpdateItemFn);
        },
        
        methods:{
            btnAddItemFn(){
                this.btnAddItem = {
                    round: this.$winSize !== 'big',
                    color: "primary",
                    tooltip: "Dodaj proizvod",
                    label: this.$winSize === 'big' ? 'Dodaj proizvod' : '',
                    icon: 'add'
                }
            },

            btnUpdateItemFn(){
                this.btnUpdateItem = {
                    color: "positive",
                    tooltip: "Ažuriraj proizvod",
                    label: this.$winSize === 'big' ? 'Ažuriraj proizvod' : '',
                    icon: 'save'
                }
            },

            propExpend(props){
                if(!props.expand) this.$refs.orderTbl.$data.innerExpanded.length = 0;

                props.expand = !props.expand;
                this.itemChange = Object.assign({}, props.row);
                this.$refs.formItem.validate()
            },

            updateItem(){
                const dialogObj = {
                    title: 'Ažuriranje porudžbine',
                    icon: 'warning',
                    message: 'Da li želite da ažurirate porudžbinu?',
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
                
                this.$refs.formItem.validate()
                    .then(success => {
                        if (success) {
                            this.$dialog(
                                dialogObj,
                                ()=>{
                                    this.$emit('updateItem', this.itemChange)
                                }
                            )
                        }
                        else {
                            //IF FORM HAS ERRORS
                        }
                    })
            },

            deleteItem(event){
                const dialogObj = {
                    title: 'Brisanje porudžbine',
                    icon: 'warning',
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
                        this.$emit('deleteItem', event)
                    }
                )
            }

        }
    }
</script>