import Bot from "./bot";
import { Urls } from "./@types/url";
import { FieldsId } from "./@types/fields";
import { Page } from "puppeteer";
import { User } from "./user";

export default class FormFilling extends Bot { 
    private urls: Urls;
    private fields = new FieldsId();
    private user: User;

    constructor(urls: Urls, user: User){
        super();
        this.urls = urls;
        this.user = user;
    }

    async formfilling(){
        if(process.env.LOGIN == undefined 
        || process.env.PASSWORD == undefined) return false;
        
        await this.build();
        const signedIn = await this.signIn(this.urls, process.env.LOGIN, process.env.PASSWORD);        
        if(!signedIn){
            await this.screenshot('error-on-login');
            await this.destroy();
            return false;
        }

        await this.navigateTo(this.urls.base + this.urls.enrollments + this.urls.new);
        
        if(!this.page) return false;

        const personalDataFilled = await this.fillPersonalData(this.page, this.user, this.fields.personalData);
        if(!personalDataFilled) return false;
        console.log('personal data filled');
        const addressDataFilled = await this.fillAddressData(this.page, this.user, this.fields.addressData);
        console.log('after address data');
        if(!addressDataFilled) return false;

        await this.screenshot('after-personall');
        await this.destroy();
    }

    async fillPersonalData(page: Page, user: User, personalDataFields: typeof this.fields.personalData) {        
        await page.type(personalDataFields.fullName(), user.getPersonalData().fullName);
        await page.type(personalDataFields.email(), user.getPersonalData().email);
        await page.type(personalDataFields.cpf(), user.getPersonalData().cpf);
        await page.type(personalDataFields.birthDate(), user.getPersonalData().birthDate);
        await page.select(personalDataFields.gender(), user.getPersonalData().genre);
        await page.type(personalDataFields.mothersName(), user.getPersonalData().mothersName);

        return true;
    }

    async fillAddressData(page: Page, user: User, addressDataFields: typeof this.fields.addressData) {
        const userAddress = user.getAddressData();
        if(!userAddress) return false;    

        if(userAddress.address)
            await page.type(addressDataFields.address(), userAddress.address);
        if(userAddress.city)
            await page.select(addressDataFields.city(), userAddress.city);
        if(userAddress.state)
            await page.select(addressDataFields.state(), userAddress.state);

        return true;
    }

    async post(){}
}