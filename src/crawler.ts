import crypto from 'crypto';
import puppeteer, { Browser, Page } from 'puppeteer';

export default class Crawler{
    protected browser : Browser | undefined;
    protected page : Page | undefined;
    protected url: string;
    protected loginUrl: string;
    protected alertClass: string;

    constructor(url: string, loginUrl: string, alertClass: string){
        this.url = url;
        this.loginUrl = loginUrl;
        this.alertClass = alertClass;
    }

    async build(){
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();        
        await this.page.setViewport({width: 1366, height: 768});
    }

    async getAlertMessage(){
        if(!this.page)
            return null;

        await this.page.goto(this.url, {
            waitUntil: 'networkidle2',
        });

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
        await this.page.goto(this.loginUrl, {
            waitUntil: 'networkidle2',
        });
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

        async getScreenshot(){
            if(!this.page) return;
            const id = crypto.randomBytes(16).toString("hex");
            await this.page.screenshot({
                path: `results/img/${id}.png`,
            });
        }
        
        async destroy(){
            if(this.browser)
                await this.browser.close();
        }
    }