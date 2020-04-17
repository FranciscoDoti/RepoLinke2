const { Builder, By, Key, until } = require('selenium-webdriver');
const { Given, When, Then } = require('cucumber');
var webdriver = require('selenium-webdriver');
var driver;
require('chromedriver');
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);

Given('Abrir la pagina de instagram', async function () {

  this.driver = await new webdriver.Builder().usingServer('http://localhost:4444/wd/hub/').forBrowser('chrome').build();
  await this.driver.get('http://www.instagram.com');
  await this.driver.manage().window().maximize();
});

When(/^INSTA. Iniciar sesion con usuario "(.*)" y contraseña "(.*)"$/, async function (usuario, password) {
  var BotonEntrar;
  await this.driver.sleep(3000);
  await this.driver.wait(until.elementLocated(By.xpath('//a[.="Entrar"]')));
  BotonEntrar = await this.driver.findElement(By.xpath('//a[.="Entrar"]'));
  await BotonEntrar.click();
  var correo;
  var contraseña;
  await this.driver.sleep(3000);
  correo = await this.driver.findElement(By.xpath('//input[@name= "username"]'));
  await correo.sendKeys(usuario);
  contraseña = await this.driver.findElement(By.xpath('//input[@name= "password"]'));
  await contraseña.sendKeys(password);
  var botonEntrar;
  botonEntrar = await this.driver.findElement(By.xpath('//button[.= "Iniciar sesión"]'));
  await botonEntrar.click();

});
/*
 When(/^Iniciar sesion con usuario "(.*)" y contraseña "(.*)"$/,async function (usuario, contraseña) {
    var Botoninicarsesionconfb;
    Botoninicarsesionconfb  = await this.driver.findElement(By.xpath ('//button[.="Iniciar sesión con Facebook"]'));
    await Botoninicarsesionconfb.click();
    var correo;
    var contraseña;
    await this.driver.wait(until.elementLocated(By.xpath('//*[@id="email"]')));
    correo = await this.driver.findElement(By.xpath ('//*[@id="email"]'));
    await correo.sendKeys(usuario);
    contraseña = await this.driver.findElement(By.xpath ('//*[@id="pass"]'));
    await contraseña.sendKeys(contraseña);
    var botonEntrar;
    botonEntrar = await this.driver.findElement (By.xpath ('//*[@id="loginbutton"]'));
    await botonEntrar.click();

});
*/
When(/^Si aparece el cartel de notificaciones seleccionar "(.*)"$/, async function (opcion) {

  if (opcion === "Activar") {
    var botonActivar;
    botonActivar = await this.driver.findElement(By.xpath('//button[text()="Activar"]'));
    await botonActivar.click();


  } else if (opcion === "Ahora no") {
    var botonAhoraNo;
    await this.driver.wait(until.elementLocated(By.xpath('//button[.="Ahora no"]')));
    botonAhoraNo = await this.driver.findElement(By.xpath('//button[.="Ahora no"]'));
    await botonAhoraNo.click();
  } else {
    console.log("La opcion no es correcta");
  }

});

When(/^Ir al buscador y escribir "(.*)"$/, async function (textoABuscar) {
  await this.driver.sleep(3000);
  var buscador = await this.driver.findElement(By.xpath('//input[@placeholder="Busca"]'));
  await buscador.sendKeys(textoABuscar);
  await this.driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Busca"]//..//a[1]')));
  var primerElemento = await this.driver.findElement(By.xpath('//input[@placeholder="Busca"]//..//a[1]'));
  await primerElemento.click();

  await this.driver.wait(until.elementLocated(By.xpath('//a[contains(.,"seguidores")]')));
  var seguidores = await this.driver.findElement(By.xpath('//a[contains(.,"seguidores")]'));
  await seguidores.click();
 await this.driver.sleep(3000);
  let i= 1;
  let seguidos= 0;
  while ( seguidos<=50){
    try {
      var seguir = await this.driver.findElement(By.xpath('//div[@class="isgrP"]/ul/div/li[' + i + ']//button[.="Seguir"]'));
      await seguir.click();
      i++;
      seguidos++;
      console.log("usuarios seguidos: "+seguidos);
    } catch (error) {
      console.log("no se pudo seguir a este usuario");
      i++;
    }
   
  };
  
});