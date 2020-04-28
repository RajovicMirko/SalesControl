<template>
    <q-dialog ref="dialog" @hide="onDialogHide">
        <q-card class="q-dialog-plugin-custom">
        
            <q-card-section class="q-dialog-plugin-custom-title">
                <span>{{ title }}</span>
            </q-card-section>

            <q-card-section class="q-dialog-plugin-custom-body">
                <div class="row q-dialog-plugin-custom-body-message">
                    <div v-if="icon" class="column q-dialog-plugin-custom-body-message-avatar">
                        <q-icon class="q-dialog-plugin-custom-body-message-avatar-icon"
                            :color="iconColor"
                            :name="icon" />
                    </div>
                    <q-item-section class="column q-dialog-plugin-custom-body-message-text">
                        {{ message }}
                    </q-item-section>
                </div>
            </q-card-section>

            <!-- buttons example -->
            <q-card-actions class="q-dialog-plugin-custom-actions" :align="btnAlign">
                <q-btn class="q-dialog-plugin-custom-actions-cancel" color="positive" label="Cancel" @click="onCancelClick" />
                <q-space v-if="btnSpace" />
                <q-btn class="q-dialog-plugin-custom-actions-ok" color="negative" round flat dense label="OK" @click="onOKClick" />
            </q-card-actions>

        </q-card>
    </q-dialog>
</template>

<script>
export default {
  props: {
        message: {
            type: String
        },
        title: {
            type: String
        },
        btnSpace: {
            type: Boolean,
            default: true
        },
        btnAlign: {
            type: String,
            default: 'right'
        },
        icon:{
            type: String,
            default: ''
        },
        iconColor: {
            type: String,
            default: 'primary'
        }
  },

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>