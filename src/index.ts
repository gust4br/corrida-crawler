import dotenv from 'dotenv';
import Notify from './domain/notify';
import FormFilling from './FormFilling';
import { Urls } from './@types/url';
import { Category, Genre, TShirt, User } from './domain/user';

dotenv.config();
const urls: Urls = {
    base: "https://corridadopantanal.com.br",
    login: "/users/sign_in",
    enrollments: "/enrollments",
    new: "/new"
}

const runInterval = 1000 * 60 * 60; //1hr;

async function executeFilling(){
    const notify = new Notify();
    const user = new User('Gustavo Gomes', 'gustavo@gomes.com', '13/02/2004', '123.456.789-10', Genre.MASCULINO, 'Marcia silva', Category.GENERAL_8KM, TShirt.G);
    user.setAddressData('Rua Super Master, 123', '24', '5119');
    // user.setHealthInsuranceData('Unimed');
    user.setEmergencyContactData('Marcia Silva', 'marcia@silva.com', '67999490563');
    user.setSocialMediaData({instagram: 'instagram', x: 'x', facebook: 'facebook', linkedin: 'linkedin', tiktok: 'tiktok'});    

    const filling = new FormFilling(urls, user);

    const result = await filling.formfilling();

    if(!result)
        notify.log("Erro ao enviar o formulário");
    notify.log("Formulário enviado com sucesso.");
}

executeFilling();

// async function execute() {
//     const crawler = new Crawler(pageUrl, loginUrl, alertClass);
//     const notify = new Notify();
    
//     notify.log('Iniciando nova busca...');

//     await crawler.build();
//     let message = await crawler.getAlertMessage();
//     if(!message) message = 'Alerta não encontrado.';
    
//     notify.log(message);

//     const notifyResponse = await notify.notifyAsync({
//         title: 'Crawler Buscou!',
//         message: message,
//         actions: 'Verificar',
//         wait: true,
//         sound: true,
//     });

//     if(notifyResponse == 'activate'){
//         notify.log('Iniciando busca avançada.');

//         if(process.env.LOGIN == undefined || process.env.PASSWORD == undefined){
//             notify.log('Variáveis de ambiente não configuradas. Busca avançada cancelada!');
//             return;
//         }

//         const canSubscribe = await crawler.getSubscriptionsStatus(process.env.LOGIN, process.env.PASSWORD);
//         let canSubscribeMessage = 'Inscrição não encontrada.';
//         if(canSubscribe)
//             canSubscribeMessage = 'É possível registrar!';
//         notify.log(canSubscribeMessage);

//         await notify.notifyAsync({
//             title: 'Crawler Buscou!',
//             message: canSubscribeMessage,
//             sound: true
//         });
//         await crawler.screenshot();
//     }
//     notify.log('Finalizando busca...');
//     await crawler.destroy();
// };
// execute();

// setInterval(execute, runInterval);