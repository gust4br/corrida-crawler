import Bot from './domain/bot';

export default class Crawler extends Bot{
    private url: string;
    private loginUrl: string;

    constructor(url: string, loginUrl: string, alertClass: string){
        super();
        this.url = url;
        this.loginUrl = loginUrl;
    }

    async getAlertMessage(){
        if(!this.page)
            return null;

        await this.navigateTo(this.url);        

        const message = await this.page.evaluate(() => {
            const alert = document.querySelector('.alert.alert-danger');
            if(alert)
                return alert.textContent!.trim();
            return null;
        });

        return message;
    }

    
    async getSubscriptionsStatus(login: string, password: string){
        if(!this.page) return;
        
        await this.navigateTo(this.loginUrl);

        const loginSelector = 'input.form-control[name="user[login]"]';
        const passwordSelector = 'input.form-control[type="password"][name="user[password]"]';
        const submitSelector = 'input[type="submit"].btn-primary';
        
        await this.page.type(loginSelector, login);
        await this.page.type(passwordSelector, password);
        await this.page.waitForSelector(submitSelector);
        await this.page.click(submitSelector);
        
        const canSubscribe = await this.page.evaluate(() => {
            const subscribeButton = document.querySelector('.actions .btn-primary');
            if(subscribeButton)
                if(subscribeButton.textContent!.trim())
                    return true;
                return false;
            });
            
            return canSubscribe;
    }
        
}