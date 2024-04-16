import crypto from 'crypto';
import puppeteer, { Browser, Page } from "puppeteer";
import { Urls } from './@types/url';

export default abstract class Bot{
  protected browser : Browser | undefined;
  protected page : Page | undefined;  

  async build(){
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();        
    await this.page.setViewport({width: 1366, height: 768 * 4});
  }

  async signIn(urls: Urls, login: string, password: string){
    if(!this.page) return false;

    await this.navigateTo(urls.base + urls.login);
    const loginSelector = 'input.form-control[name="user[login]"]';
    const passwordSelector = 'input.form-control[type="password"][name="user[password]"]';
    const submitSelector = 'input[type="submit"].btn-primary';

    await this.page.type(loginSelector, login);
    await this.page.type(passwordSelector, password);
    await this.page.waitForSelector(submitSelector);
    await this.page.click(submitSelector);

    if(this.page.url() === urls.base + urls.enrollments)
      return true;
    return false;
  }

  navigateTo(url: string){
    if(!this.page) throw new Error("Página não construída.");

    return this.page.goto(url, {
      waitUntil: 'networkidle2',
    });
  }

  screenshot(name?: string){
    if(!this.page) throw new Error("Página não construída.");
    const id = crypto.randomBytes(16).toString("hex");    
    return this.page.screenshot({
        path: `results/img/${name && name + '-'}${id}.png`,
    });
  }

  destroy(){
    if(this.browser)
      return this.browser.close();
    throw new Error('Não foi possível fechar o navegador!');
  }
}