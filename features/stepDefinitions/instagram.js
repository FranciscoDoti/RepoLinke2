const { Builder, By, Key, until } = require('selenium-webdriver');
const {Given, When, Then} = require ('cucumber');
var webdriver = require ('selenium-webdriver');
var driver;
require('chromedriver');
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);

Given('Abrir la pagina de instagram',async function () {

    this.driver = await new webdriver.Builder().forBrowser('chrome').build();
    await this.driver.get ('http://www.instagram.com');
    await this.driver.manage().window().maximize();
  });

 When('Iniciar sesion',async function () {
    var Botoninicarsesionconfb;
    Botoninicarsesionconfb  = await this.driver.findElement(By.xpath ('//button[.="Iniciar sesión con Facebook"]'));
    await Botoninicarsesionconfb.click();
    var correo;
    var contraseña;
    correo = await this.driver.findElement(By.xpath ('//*[@id="email"]'));
    await correo.sendKeys('franciscodotitexeira@gmail.com');
    contraseña = await this.driver.findElement(By.xpath ('//*[@id="pass"]'));
    await contraseña.sendKeys('Yosoyyo123');
    var botonEntrar;
    botonEntrar = await this.driver.findElement (By.xpath ('//*[@id="loginbutton"]'));
    await botonEntrar.click();

});

When (/^Si aparece el cartel de notificaciones seleccionar "(.*)"$/, async function (opcion){

  if (opcion === "Activar"){
    var botonActivar;
    botonActivar = await this.driver.findElement(By.xpath('//button[text()="Activar"]'));
    await botonActivar.click();


  } else if (opcion === "Ahora no"){
    var botonAhoraNo;
    botonAhoraNo = await this.driver.findElement(By.xpath('//button[text()="Ahora no"]'));
    await botonAhoraNo.click();
  } else{
    console.log ("La opcion no es correcta");
  }

});

When (/^Ir al buscador y escribir "(.*)"$/, async function (textoABuscar){
  var buscador = await this.driver.findElement(By.xpath('//input[@placeholder="Busca"]')) ;
  buscador.sendKeys (textoABuscar);

});



/*


When(/^I apply the following text filter "(.*)"$/, async function(textFilter){
    await filterslib.setTextFilter(textFilter);
});

*/