import { Page } from "puppeteer";
import Bot from "./domain/bot";
import { Urls } from "./@types/url";
import { FieldsId } from "./domain/fields";
import { User } from "./domain/user";
import Notify from "./domain/notify";

export default class FormFilling extends Bot { 
    private urls: Urls;
    private fields = new FieldsId();
    private user: User;
    private notify = new Notify();

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
        this.notify.log("Usuário logado com sucesso!");
        if(!this.page) return false;

        const personalDataFilled = await this.fillPersonalData(this.page, this.fields.personalData);
        if(!personalDataFilled) return false;
        this.notify.log("Processo: Dados pessoais finalizado.");
        
        const addressDataFilled = await this.fillAddressData(this.page, this.fields.addressData);
        if(!addressDataFilled) return false;
        this.notify.log("Processo: Endereço finalizado.");

        const categoryDataFilled = await this.fillCategoryData(this.page, this.fields.categoryData);
        if(!categoryDataFilled) return false;

        this.notify.log("Processo: Categoria finalizado.");

        const tShirtDataFilled = await this.fillTShirtData(this.page, this.fields.tShirtData);
        if(!tShirtDataFilled) return false;

        this.notify.log("Processo: Tamanho camiseta finalizado.");

        const healthInsuranceDataFilled = await this.fillHealthInsuranceData(this.page, this.fields.healthInsuranceData);
        if(!healthInsuranceDataFilled) return false;

        this.notify.log("Processo: Plano de saúde finalizado.");

        const emergencyContactDataFilled = await this.fillEmergencyContactData(this.page, this.fields.emergencyContactData);
        if(!emergencyContactDataFilled) return false;

        this.notify.log("Processo: Contato de emergência finalizado.");

        const socialMediaDataFilled = await this.fillSocialMediaData(this.page, this.fields.socialMediaData);
        if(!socialMediaDataFilled) return false;

        this.notify.log("Processo: Redes sociais finalizado.");

        const carbonEmissionsDataFields = await this.fillCarbonEmissionsData(this.page, this.fields.carbonoAttributesData);
        if(!carbonEmissionsDataFields) return false;

        this.notify.log("Processo: Emissão de carbono finalizado.");

        const termsAccepted = await this.acceptTerms(this.page);
        if(!termsAccepted) return false;

        this.notify.log("Termos aceitos!");

        const submited = await this.submit(this.page);
        if(!submited) return false;

        this.notify.log("Enviando formulário...");

        const message = await this.checkReturnMessage(this.page);
        if(!message){
            await this.screenshot('error-form');
            return false;
        }

        await this.screenshot('form-submited');

        await this.destroy();
    }

    async fillPersonalData(page: Page, personalDataFields: typeof this.fields.personalData) {        
        await page.type(personalDataFields.fullName(), this.user.getPersonalData().fullName);
        await page.type(personalDataFields.email(), this.user.getPersonalData().email);
        await page.type(personalDataFields.cpf(), this.user.getPersonalData().cpf);
        await page.type(personalDataFields.birthDate(), this.user.getPersonalData().birthDate);
        await page.select(personalDataFields.gender(), this.user.getPersonalData().genre);
        await page.type(personalDataFields.mothersName(), this.user.getPersonalData().mothersName);

        return true;
    }

    async fillAddressData(page: Page, addressDataFields: typeof this.fields.addressData) {
        const userAddress = this.user.getAddressData();
        if(!userAddress) return false;    

        if(userAddress.address)
            await page.type(addressDataFields.address(), userAddress.address);
        if(userAddress.city)
            await page.select(addressDataFields.city(), userAddress.city);
        if(userAddress.state)
            await page.select(addressDataFields.state(), userAddress.state);

        return true;
    }

    async fillCategoryData(page: Page, categoryDataFields: typeof this.fields.categoryData) {
        await page.select(categoryDataFields.category(), this.user.getCategoryData().category);
        return true;
    }

    async fillTShirtData(page: Page, tShirtDataFields: typeof this.fields.tShirtData) { 
        await this.clickHidden(tShirtDataFields.prefix + this.user.getTShiftData().tShirt);
        return true;
    }

    async fillHealthInsuranceData(page: Page, healthInsuranceDataFields: typeof this.fields.healthInsuranceData){
        const healthInsuranceData = this.user.getHealthInsuranceData();
        await this.clickHidden(healthInsuranceDataFields.prefix + this.user.getHealthInsuranceData().hasHealthInsurance);

        if(healthInsuranceData.name)
        await page.type(healthInsuranceDataFields.kind(), healthInsuranceData.name);

        return true;
    }

    async fillEmergencyContactData(page: Page, emergencyContactDataFields: typeof this.fields.emergencyContactData) {
        const emergencyContactData = this.user.getEmergencyContactData();

        if(emergencyContactData.fullName)
            await page.type(emergencyContactDataFields.fullName(), emergencyContactData.fullName);
        if(emergencyContactData.email)
            await page.type(emergencyContactDataFields.email(), emergencyContactData.email);
        if(emergencyContactData.phone)
            await page.type(emergencyContactDataFields.phone(), emergencyContactData.phone);

        return true;
    }

    async fillSocialMediaData(page: Page, socialMediaDataFields: typeof this.fields.socialMediaData){
        const socialMediaData = this.user.getSocialMediaData();

        if(socialMediaData.instagram)
            await page.type(socialMediaDataFields.instagram(), socialMediaData.instagram);
        if(socialMediaData.facebook)
            await page.type(socialMediaDataFields.facebook(), socialMediaData.facebook);
        if(socialMediaData.linkedin)
            await page.type(socialMediaDataFields.linkedin(), socialMediaData.linkedin);
        if(socialMediaData.tiktok)
            await page.type(socialMediaDataFields.tiktok(), socialMediaData.tiktok);
        if(socialMediaData.x)
            await page.type(socialMediaDataFields.x(), socialMediaData.x);

        return true;
    }

    async fillCarbonEmissionsData(page: Page, carbonEmissionsDataFields: typeof this.fields.carbonoAttributesData){        
        await page.select(carbonEmissionsDataFields.vehicleSelect.id, carbonEmissionsDataFields.vehicleSelect.ownVehicle);
        await this.clickHidden('#enrollment_carbono_attributes_carona_evento_true');
        await page.type(carbonEmissionsDataFields.roundTrips(), '1');
        return true;
    }

    async acceptTerms(page: Page){
        await page.click(this.fields.polices);
        return true;
    }

    async submit(page: Page){
        await page.click("#enrollment-submit");

        return true;
    }

    async checkReturnMessage(page: Page){
        const message = await page.evaluate(() => {
            const alert = document.querySelector('.error-block');
            if(alert)
                return alert.textContent!.trim();
            return null;
        });

        if(message)
            return true;
        return false;
    }
}