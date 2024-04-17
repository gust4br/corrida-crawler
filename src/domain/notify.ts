import dayjs from "dayjs";
import nodeNotifier from "node-notifier";
import { Notification } from "node-notifier/notifiers/notificationcenter";

export default class Notify{  
  log(message: string){
    const now = dayjs();
    console.log(now.format('DD/MM/YYYY [às] HH:mm:ss') + ' - ' + message);
  }

  notifyAsync(options: Notification){
    return new Promise((resolve, reject) => {
      nodeNotifier.notify(options, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }
}