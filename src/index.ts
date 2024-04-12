import dayjs from "dayjs";
import Crawler from "./crawler";
import nodeNotifier from "node-notifier";

const pageUrl = "https://corridadopantanal.com.br/";
const alertClass = ".alert.alert-danger";
const runInterval = 1000 * 60 * 15; //30 min;

async function execute() {
    const now = dayjs();    
    const crawler = new Crawler(pageUrl, alertClass, now.format('DD-MM-YYYY-HH-mm-ss'));
    
    await crawler.build();
    let message = await crawler.getAlertMessage();
    if(!message)
        message = 'Alerta não encontrado.';
    
    console.log(now.format('DD/MM/YYYY [às] HH:mm:ss') + ' - ' + message);

    nodeNotifier.notify({
        title: 'Crawler Buscou!',
        message: message,
        sound: true, // Opcional, toca um som de notificação
    });

    await crawler.destroy();
};

execute();

setInterval(execute, runInterval);