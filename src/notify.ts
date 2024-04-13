import nodeNotifier from "node-notifier";
import { Notification } from "node-notifier/notifiers/notificationcenter";

export default class Notify{
  constructor(){

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