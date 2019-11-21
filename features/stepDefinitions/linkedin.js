const { Builder, By, Key, until, Keys } = require('selenium-webdriver');
const { Given, When, Then } = require('cucumber');
var webdriver = require('selenium-webdriver');
var driver;
require('chromedriver');
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(600 * 1000);

Given('Abrir la pagina de Linkedin', async function () {

  this.driver = await new webdriver.Builder().forBrowser('chrome').build();
  await this.driver.get('http://www.linkedin.com');
  
  await this.driver.manage().window().maximize();
  

});
  


When('Inicio sesion en Linkedin con usuario {} y contraseña {}', async function (usuario, contraseña) {
  // Write code here that turns the phrase above into concrete actions
  let mail = await this.driver.findElement(By.xpath('//div[@class="input"]/input[@name="session_key"]'));
  //await this.driver.wait(until.elementLocated(mail,  100));    
  let contra = await this.driver.findElement(By.xpath('//div[@class="input"]/input[@name="session_password"]'));;
  let iniciar = await this.driver.findElement(By.xpath('//button[@data-tracking-control-name="guest_homepage-basic_sign-in-submit-btn"]'));;
  await mail.sendKeys(usuario);
  await contra.sendKeys(contraseña);
  await iniciar.click();
});

When('Busco los usuarios con el filtro que quiero', async function () {
  var acum = 0;
  // Write code here that turns the phrase above into concrete actions
  await this.driver.wait(until.elementLocated(By.xpath('//input[@aria-label="Buscar"]')));
  let barraBuscador = await this.driver.findElement(By.xpath('//input[@aria-label="Buscar"]'));
  await barraBuscador.click();
  let lupita = await this.driver.findElement(By.xpath('//button[@data-control-name="nav.search_button"]'));
  await lupita.click();
  await this.driver.wait(until.elementLocated(By.xpath('//button[@data-control-name="all_filters"]')));
  let TodosLosFiltros = await this.driver.findElement(By.xpath('//button[@data-control-name="all_filters"]'));
  await TodosLosFiltros.click();
  let ubicaciones = await this.driver.findElement(By.xpath('//input[@placeholder="Añadir un país o región"]'));
  await ubicaciones.sendKeys('Miami');
  let cargo = await this.driver.findElement(By.xpath('//input[@id="search-advanced-title"]'));
  await cargo.sendKeys('Recruiter');
  let Aplicar = await this.driver.findElement(By.xpath('//button[@data-control-name="all_filters_apply"]'));
  await Aplicar.click();


  //Mandarle de conectar a la gente
  for (let pagina = 0; pagina < 50; pagina++) {
    for (let i = 1; i <= 10; i++) {
      try {
          await this.driver.sleep(2000);
        let botonConectar = await this.driver.findElement(By.xpath('//ul[@class="search-results__list list-style-none "]/li[' + i + ']//button[contains(.,"Conectar")]'));
        await botonConectar.click();
        try {
          var notaPersonal = await this.driver.findElement(By.xpath('//p[contains(., "incluir una nota personal")]'));
        } catch (error) {
          
        }


        if (notaPersonal!== undefined){
            await this.driver.navigate().refresh();
            notaPersonal= undefined;
        }else {
          await this.driver.wait(until.elementLocated(By.xpath('//span[contains(.,"Enviar ahora")]')));
          let botonEnviarAhora = await this.driver.findElement(By.xpath('//span[contains(.,"Enviar ahora")]'));
          await botonEnviarAhora.click();
          acum++;
         
        }
        
      }
      catch (error) {
        
      }
    };
    await this.driver.executeScript("window.scrollBy(200,300)");
    await this.driver.sleep(3000);
    await this.driver.wait(until.elementLocated(By.xpath('//button[@aria-label="Siguiente"]')));
    console.log("Invitaciones enviadas hasta el momento: "+ acum);
    console.log("Cambiando a pagina : "+ (pagina+1));
    let siguiente = await this.driver.findElement(By.xpath('//button[@aria-label="Siguiente"]'));
    await siguiente.click();
  };

});  

When('Abro Pagina de Mensajes', async function(){
  await this.driver.wait(until.elementLocated(By.xpath('//li[@id= "messaging-nav-item"]/a')));
  let Mensajes = await this.driver.findElement(By.xpath('//li[@id= "messaging-nav-item"]/a'));
  await Mensajes.click();
  
});

Then('le entro a mandar mensaje a todo el mundo', async function(){
  await this.driver.sleep(3000);
  for (let i=1; i<=100; i++){
      let CardIzq = await this.driver.findElement(By.xpath('//ul[contains(@class,"msg-conversations")]/li['+i+']'));
      await CardIzq.click();
      let ventanitaChat = await this.driver.findElement(By.xpath('//div[contains(@class,"msg-form__contenteditable") and @role="textbox"]'));
      await ventanitaChat.click();
      await ventanitaChat.sendKeys("Hola\n ");
      let botonEnviar = await this.driver.findElement(By.xpath('//button[@type="submit" and contains(@class, "send")]'));
  }

});