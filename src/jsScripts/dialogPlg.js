import dialogCmp from '../components/Shared/dialogCmp';

export function dialog(dialogObj, fnOk, fnCancel = ()=>{}, fnDismiss = ()=>{}){
    dialogObj['component'] = dialogCmp;
    
    this.$q.dialog(dialogObj)
    .onOk(() => {
        fnOk();
    }).onCancel(() => {
        fnCancel();
    }).onDismiss(() => {
        //THIS PART IS ALLWAYS EXECUTED WITH OK AND CANCEL
        fnDismiss();
    });
}