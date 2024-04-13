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
    const crawler = new Crawler(pageUrl, loginUrl, alertClass);
    const notify = new Notify();
    
    notify.log('Iniciando nova busca...');

    await crawler.build();
    let message = await crawler.getAlertMessage();
    if(!message) message = 'Alerta não encontrado.';
    
    notify.log(message);

    const notifyResponse = await notify.notifyAsync({
        title: 'Crawler Buscou!',
        message: message,
        actions: 'Verificar',
        wait: true,
    });

    if(notifyResponse == 'activate'){
        notify.log('Iniciando busca avançada.');

        if(process.env.LOGIN == undefined || process.env.PASSWORD == undefined){
            notify.log('Variáveis de ambiente não configuradas. Busca avançada cancelada!');
            return;
        }        

        const canSubscribe = await crawler.getSubscriptionsStatus(process.env.LOGIN, process.env.PASSWORD);
        let canSubscribeMessage = 'Inscrição não encontrada.';
        if(canSubscribe)
            canSubscribeMessage = 'É possível registrar!';
        notify.log(canSubscribeMessage);

        await notify.notifyAsync({
            title: 'Crawler Buscou!',
            message: canSubscribeMessage,
        });
        await crawler.getScreenshot();
    }
    notify.log('Finalizando busca...');
    await crawler.destroy();
};
execute();

setInterval(execute, runInterval);