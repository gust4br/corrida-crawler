import { mkdirSync } from 'fs';
import puppeteer, { Browser, Page } from 'puppeteer';

export default class Crawler{
    protected browser : Browser | undefined;
    protected page : Page | undefined;
    protected url: string;
    protected alertClass: string;
    protected dateTime: string | undefined;

    constructor(url: string, alertClass: string, time: string){
        this.url = url;
        this.alertClass = alertClass;
        this.dateTime = time;
    }

    async build(){
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
        await this.page.goto(this.url, {
            waitUntil: 'networkidle2',
        });
        await this.page.setViewport({width: 1366, height: 768});
    }

    async getAlertMessage(){
        if(!this.page)
            return null;
        const message = await this.page.evaluate(() => {
            const alert = document.querySelector('.alert.alert-danger');
            if(alert)
                return alert.textContent!.trim();
            return null;
        });

        return message;
    }

    async getScreenshot(){
        if(!this.page)
            return;

        
        mkdirSync('results/img');
        await this.page.screenshot({
            path: `results/img/${this.dateTime}-screen.png`,
        });
    }

    async destroy(){
        if(this.browser)
            await this.browser.close();
    }
}