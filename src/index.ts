import dotenv from 'dotenv';
import dayjs from "dayjs";
import Crawler from "./crawler";
import Notify from "./notify";

dotenv.config();

const pageUrl = "https://corridadopantanal.com.br/";
const loginUrl = "https://corridadopantanal.com.br/users/sign_in";
const alertClass = ".alert.alert-danger";
const runInterval = 1000 * 60 * 15; //30 min;

async function execute() {
    let now = dayjs();
    const crawler = new Crawler(pageUrl, loginUrl, alertClass, now.format('DD-MM-YYYY-HH-mm-ss'));
    const notify = new Notify();
    
    await crawler.build();
    let message = await crawler.getAlertMessage();
    // let message = null;
    if(!message) message = 'Alerta não encontrado.';
    
    console.log(now.format('DD/MM/YYYY [às] HH:mm:ss') + ' - ' + message);

    const notifyResponse = await notify.notifyAsync({
        title: 'Crawler Buscou!',
        message: message,
        actions: 'Verificar',
        wait: true,
    });

    if(notifyResponse == 'activate'){
        now = dayjs();
        if(process.env.LOGIN == undefined || process.env.PASSWORD == undefined){
            console.log(now.format('DD/MM/YYYY [às] HH:mm:ss') + ' - ' + 'Variáveis de ambiente não configuradas.');
            return;
        }        

        const canSubscribe = await crawler.getSubscriptionsStatus(process.env.LOGIN, process.env.PASSWORD);
        let canSubscribeMessage = 'Inscrição não encontrada';
        if(canSubscribe)
            canSubscribeMessage = 'É possível registrar!';
        now = dayjs();
        console.log(now.format('DD/MM/YYYY [às] HH:mm:ss') + ' - ' + canSubscribeMessage);

        await notify.notifyAsync({
            title: 'Crawler Buscou!',
            message: canSubscribeMessage,
        });
        await crawler.getScreenshot();
    }
    now = dayjs();
    console.log(now.format('DD/MM/YYYY [às] HH:mm:ss') + ' - ' + 'Fechando...');
    await crawler.destroy();
};
execute();

setInterval(execute, runInterval);