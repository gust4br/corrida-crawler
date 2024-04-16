import dotenv from 'dotenv';
import FormFilling from './FormFilling';
import { Urls } from './@types/url';
import { Category, Genre, TShirt, User } from './user';

dotenv.config();
const urls: Urls = {
    base: "https://corridadopantanal.com.br",
    login: "/users/sign_in",
    enrollments: "/enrollments",
    new: "/new"
}

const pageUrl = "https://corridadopantanal.com.br/";
const loginUrl = "https://corridadopantanal.com.br/users/sign_in";
const alertClass = ".alert.alert-danger";
const runInterval = 1000 * 60 * 60; //1hr;

async function executeFilling(){
    const user = new User('Gustavo Gomes', 'gustavo@gomes.com', '11/03/2000', '123.456.789-10', Genre.MASCULINO, 'Marcia silva', Category.GENERAL_8KM, TShirt.G);
    user.setAddressData('Rua Super Master, 123', '24', '5119');
    // user.setHealthInsuranceData('Unimed');
    user.setEmergencyContactData('Marcia Silva', 'marcia@silva.com', '67999490563');

    const filling = new FormFilling(urls, user);

    await filling.formfilling();
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