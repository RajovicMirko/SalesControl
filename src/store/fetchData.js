import { notify } from '../jsScripts/notification.js';
import { Loading } from 'quasar';
import axios from 'axios';

export function fetchData(allData, callback){
    axios(
        allData,
    )
    .then((res) => {
        callback(res);
    })
    .catch((err) => {
        Loading.hide();
        notify({
            icon: "error",
            color: "negative",
            position: 'bottom',
            caption: `Error status ${err.response.status}`,
            message: err.response.statusText,
        });
    });
};
