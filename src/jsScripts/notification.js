import { Notify } from 'quasar';

export function notify(notifyObj){
    Notify.registerType(
        'my-notif',
        {
            progress: true,
            classes: 'glossy'
        }
    )

    Notify.create({
        type: 'my-notif',
        icon: notifyObj.icon,
        color: notifyObj.color,
        position: notifyObj.position,
        message: notifyObj.message,
        caption: notifyObj.caption,
        timeout: 2500
    })
}