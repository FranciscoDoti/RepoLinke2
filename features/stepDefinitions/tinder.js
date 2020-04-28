const { Builder, By, Key, until, Keys } = require('selenium-webdriver');
const { Given, When, Then, setDefaultTimeout } = require('cucumber');
var webdriver = require('selenium-webdriver');
require('chromedriver');
var driver;
setDefaultTimeout(30000);
const { WElements } = require(`${process.cwd()}/pages/tinder.js`);
const { assert, expect } = require('chai');
var nameLike;

Given('open Tinder', async function () {
    //usingServer('https://5cae3f60.ngrok.io/wd/hub')
    this.driver = await new webdriver.Builder().forBrowser('chrome').build();
    await this.driver.get('http://www.tinder.com');
});

When(/^iniciar sesion en Tinder con usuario "(.*)" y contraseña "(.*)"$/, async function (usuario, contraseña) {
    await this.driver.sleep(6000);
    try {

        var WEmasOpciones = await this.driver.findElement(By.xpath(WElements.WEmasOpciones));
        await WEmasOpciones.click();
    } catch (error) {
        console.log("Me dio el error: " + error);
    }

    await this.driver.wait(until.elementLocated(By.xpath(WElements.WEiniciarSesionFb)));
    await this.driver.sleep(4000);
    var WEiniciarSesionFb = await this.driver.findElement(By.xpath(WElements.WEiniciarSesionFb));
    await WEiniciarSesionFb.click();

    let handles = await this.driver.getAllWindowHandles();
    await this.driver.switchTo().window(handles[1]);

    await this.driver.wait(until.elementLocated(By.xpath(WElements.WEemail)));
    var WEemail = await this.driver.findElement(By.xpath(WElements.WEemail));
    await WEemail.sendKeys(usuario);
    await this.driver.wait(until.elementLocated(By.xpath(WElements.WEcontraseña)));
    var WEcontraseña = await this.driver.findElement(By.xpath(WElements.WEcontraseña));
    await WEcontraseña.sendKeys(contraseña);
    await this.driver.findElement(By.xpath(WElements.WEentrar)).click();
    await this.driver.switchTo().window(handles[0]);

    await this.driver.wait(until.elementLocated(By.xpath(WElements.WEpermitir)));
    var WEpermitir = await this.driver.findElement(By.xpath(WElements.WEpermitir));
    await WEpermitir.click();

    await this.driver.wait(until.elementLocated(By.xpath(WElements.WEhabilitar)));
    var WEhabilitar = await this.driver.findElement(By.xpath(WElements.WEhabilitar));
    await WEhabilitar.click();

    await this.driver.wait(until.elementLocated(By.xpath(WElements.WEacepto)));
    var WEacepto = await this.driver.findElement(By.xpath(WElements.WEacepto));
    await WEacepto.click();

    await this.driver.sleep(2000);

    /*try {
        var WEbotonNO = await this.driver.findElement(By.xpath(WElements.WEbotonNO));
        await WEbotonNO.click();
    } catch (error) {
        console.log(error);
    }*/
});

Then('mandar corazones', async function () {

    await this.driver.sleep(6000);

    for (var i = 0; i <= 20; i++) {

        try {
            await this.driver.wait(until.elementLocated(By.xpath(WElements.WEcorazon)));
            let WEcorazon = await this.driver.findElement(By.xpath(WElements.WEcorazon));
            await this.driver.sleep(300); // TODO: AGREGAR UN NUMERO RANDOM
            await WEcorazon.click();
            await this.driver.sleep(150);

            let letGustasA = await this.driver.findElement(By.xpath(WElements.letGustasA));
            
                let campoMsj = await this.driver().findElement(By.xpath(WElements.WeCampoMensajeMatch));
                await campoMsj.sendKeys("Hola, cómo andas?");
                await this.driver.sleep(150);
                let btnEnviar = await this.driver().findElement(By.xpath(WElements.WeBotonEnviarMsjMatch));
                await btnEnviar.click();
            

            /*si matcheó 
                => MAndar msj "hola, como andas"*/
                

        } catch (error) {
            console.log(error);
        }
    }
});


