<template>
    <q-breadcrumbs>
        <q-breadcrumbs-el
            v-for="(bc, i) in breadcrumbs"
            :key="i"
            :label="bc.name"
            :to="bc.path"
        />
    </q-breadcrumbs>
</template>

<script>
    export default {
        name: 'breadcrumb',
        data(){
            return {
                breadcrumbs: [],
                bcLocalStorageName: 'bc1t3m'
            }
        },

        created(){
            this.$router.$breadcrumbs = this.$q.localStorage.getItem(this.bcLocalStorageName) || [];
            this.addBradcrumbs();
            this.$router.afterHooks.push(this.addBradcrumbs);
        },

        methods:{
            addBradcrumbs(){
                const currentRoute = this.$router.currentRoute;
                const resolvedPath = this.$router.resolve(currentRoute).location;
                const paths = resolvedPath.path.slice(1).split('/');
                
                this.$router.$breadcrumbs = this.$router.$breadcrumbs.filter(bc => paths.indexOf(bc.id) !== -1);

                if(!this.$router.$breadcrumbs.find(x => x.name === resolvedPath.meta.name)){
                    this.$router.$breadcrumbs.push({
                        id: resolvedPath.name.toLowerCase(),
                        name: resolvedPath.meta.name,
                        path: resolvedPath.fullPath
                    })
                }
                
                this.breadcrumbs = this.$router.$breadcrumbs;
                this.$q.localStorage.set(this.bcLocalStorageName, this.breadcrumbs);
            }
        },
    }
</script>