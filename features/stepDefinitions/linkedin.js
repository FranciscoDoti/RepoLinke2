const { Builder, By, Key, until, Keys } = require('selenium-webdriver');
const { Given, When, Then } = require('cucumber');
var webdriver = require('selenium-webdriver');
var driver;
require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
var { setDefaultTimeout } = require('cucumber');
const { assert } = require('chai');

setDefaultTimeout('9000000');
Given('Abrir la pagina de Linkedin', async function () {
  let options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments("--window-size=1920,1080");
  options.addArguments("--start-maximized")
  this.driver = await new webdriver.Builder().setChromeOptions(options).forBrowser('chrome').build();
  // this.driver = await new webdriver.Builder().usingServer('http://localhost:4444/wd/hub')
   //.forBrowser('chrome').build();
  await console.log("driver instanciado")
  await this.driver.get('http://www.linkedin.com');
  await console.log("Just opened linkedin.com")
  await this.driver.manage().window().maximize();


});

When("Ir a la seccion Mi Red", async function () {
  await this.driver.wait(until.elementLocated(By.xpath('//span[@id="mynetwork-tab-icon"]')));
  let botonMiRed = await this.driver.findElement(By.xpath('//span[@id="mynetwork-tab-icon"]'));
  await botonMiRed.click();
});

When("Pongo para ver todas las invitaciones", async function () {
  await this.driver.wait(until.elementLocated(By.xpath('//a[@data-control-name="manage_all_invites"]//span[contains(.,"Ver todo")]')));
  let botonVerTodo = await this.driver.findElement(By.xpath('//a[@data-control-name="manage_all_invites"]//span[contains(.,"Ver todo")]'));
  await botonVerTodo.click();
});

Then("Acepto todas las invitaciones", async function () {
  await this.driver.wait(until.elementLocated(By.xpath('//section[ contains(@class, "mn-invitation-manager__sub-section")]//ul/li')));
  let InvitacionesVec = await this.driver.findElements(By.xpath('//section[ contains(@class, "mn-invitation-manager__sub-section")]//ul/li'));
  for (let i = 1; i <= InvitacionesVec.length; i++) {
    let botonAceptar = await InvitacionesVec[i].findElement(By.xpath('//button[contains(.,"Aceptar")]'));
    await botonAceptar.click();
  };
  console.log("Cantidad de invitaciones:");
});

When('Inicio sesion en Linkedin con usuario {} y contraseña {}', async function (usuario, contraseña) {
  await this.driver.sleep(4000);
  let mail = await this.driver.findElement(By.xpath('//input[@name="session_key"]'));
  //await this.driver.wait(until.elementLocated(mail,  100));    
  let contra = await this.driver.findElement(By.xpath('//input[@name="session_password"]'));;
  let iniciar = await this.driver.findElement(By.xpath('//button[contains(text(),"Iniciar sesión")]'));;
  await mail.sendKeys(usuario);
  await contra.sendKeys(contraseña);
  await iniciar.click();
  await this.driver.sleep(10000);
});

When('Busco los usuarios con el filtro que quiero', async function () {
  var acum = 0;
  // Write code here that turns the phrase above into concrete actions
  await this.driver.wait(until.elementLocated(By.xpath('//input[@aria-label="Buscar"]')));
  let barraBuscador = await this.driver.findElement(By.xpath('//input[@aria-label="Buscar"]'));
  await this.driver.sleep(4000);
  await barraBuscador.sendKeys('recruiter');
  await this.driver.actions().sendKeys(Key.ENTER).perform();
  await this.driver.sleep(4000);
  await this.driver.wait(until.elementLocated(By.xpath('//button[text()="Todos los filtros"]')));
  let TodosLosFiltros = await this.driver.findElement(By.xpath('//button[text()="Todos los filtros"]'));
  await TodosLosFiltros.click();
  // let ubicaciones = await this.driver.findElement(By.xpath('//input[@placeholder="Añadir un país o región"]'));
  //await ubicaciones.sendKeys('Miami');
  await this.driver.sleep(7000);
  let AñadirUbicacion = await this.driver.findElement(By.xpath('//span[text()="Añade una ubicación"]'));
  try {
    await AñadirUbicacion.click();
  } catch (error) {
    await this.driver.sleep(3000)
    try {
      await AñadirUbicacion.click();
    } catch (error) {
      await this.driver.sleep(3000)
      try {
        await AñadirUbicacion.click();
      } catch (error) {
        await console.error(error)
      }
    }
  }
  await this.driver.sleep(7000)
  let AñadirUbicacionTexto = await this.driver.findElement(By.xpath('//div[contains(@class,"new-value")]//input'));
  await AñadirUbicacionTexto.sendKeys('Argentina');
  await this.driver.sleep(2500);
  await this.driver.actions().sendKeys(Key.DOWN).perform();
  await this.driver.sleep(2500);
  await this.driver.actions().sendKeys(Key.ENTER).perform();
  // let cargo = await this.driver.findElement(By.xpath('//label[contains(.,"Cargo")]//input'));
  //await cargo.sendKeys('Recruiter');
  let Aplicar = await this.driver.findElement(By.xpath('//button[contains(.,"Mostrar resultados")]'));
  await Aplicar.click();

  await this.driver.sleep(5000);
  //Mandarle de conectar a la gente
  for (let pagina = 0; pagina < 50; pagina++) {
    await this.driver.sleep(7000);
    botonesConectar = await this.driver.findElements(By.xpath('//button[contains(.,"Conectar")]'))

    for (let i = 0; i < botonesConectar.length; i++) {
      try {
        await this.driver.sleep(2000);
        await botonesConectar[i].click();
        await this.driver.sleep(2000);
        
        try {
          var notaPersonal = await this.driver.findElement(By.xpath('//p[contains(., "incluir una nota personal")]'));
        } catch (error) {
          
        }


        if (notaPersonal !== undefined) {
          await this.driver.navigate().refresh();
          notaPersonal = undefined;
        } else {
          await this.driver.wait(until.elementLocated(By.xpath('//button[contains(.,"Enviar")]')));
          let botonEnviarAhora = await this.driver.findElement(By.xpath('//button[contains(.,"Enviar")]'));
          await botonEnviarAhora.click();
          acum++;

        }

      }
      catch (error) {

      }
      var limiteSemanal = await this.driver.findElements(By.xpath("//h2[contains(.,'límite semanal')]"));
      if (limiteSemanal.length!=0){
        await console.log("estoy acá en el limite semanal antes del assert fail")
        await this.driver.quit();
        assert.fail("Has alcanzado el limite semanal de invitaciones");
      }
    };
    await this.driver.executeScript("window.scrollBy(2000,2000)");
    await this.driver.sleep(3000);
    let siguiente = await this.driver.findElement(By.xpath('//button[@aria-label="Siguiente"]'));
    await siguiente.click();
    await console.log("Invitaciones enviadas hasta el momento: " + acum);
    await console.log("Cambiando a pagina : " + (pagina + 1));

  };

});

When('Abro Pagina de Mensajes', async function () {
  await this.driver.wait(until.elementLocated(By.xpath('//a[@data-test-global-nav-link= "messaging"]')));
  let Mensajes = await this.driver.findElement(By.xpath('//a[@data-test-global-nav-link= "messaging"]'));
  await Mensajes.click();

});

Then('le entro a mandar mensaje a todo el mundo', async function () {
  var mensajesMandados = 0;
  var listaChats;
  await this.driver.sleep(3000);
  var iFrames = await this.driver.findElements(By.tagName("iframe"));
  for (let repes = 1; repes < 40; repes++) {
    await this.driver.sleep(4000);
    listaChats = await this.driver.findElements(By.xpath('//ul[contains(@class,"conversations-list")]/li'));
    for (let i = mensajesMandados; i < (listaChats.length - 4); i++) {
      await listaChats[i].click();
      await this.driver.sleep(1000);
      // await this.driver.switchTo().frame(1);
      var mensaje = await this.driver.findElement(By.xpath('//div[contains(@aria-label,"Escribe")]'));
      await mensaje.sendKeys('Hola. Cómo te va? Buen día. Ante todo, disculpame las molestias. Te escribo por lo siguiente, que creo que te puede llegar a gustar. Tengo un servicio de automatización del testing que, no es por nada, pero es muy bueno, y da mucho valor y tranquilidad a las empresas. Te dejo un video muy cortito por si querés ver más detalles. Espero que te guste y quedo a disposición por cualquier consulta! Saludos y que tengas buen día');
      await this.driver.actions().sendKeys(Key.ENTER).perform();
      await mensaje.sendKeys('https://youtu.be/zRU3DEnZrAQ');
      await this.driver.actions().sendKeys(Key.ENTER).perform();
      await console.log(mensajesMandados);
      await mensajesMandados++;

    }


    /*for (let i = 1; i <= 4; i++) {
      let CardIzq = await this.driver.findElement(By.xpath('//ul[contains(@class,"msg-conversations")]/li[' + i + ']'));
      await CardIzq.click();
      let ventanitaChat = await this.driver.findElement(By.xpath('//div[contains(@class,"msg-form__contenteditable") and @role="textbox"]'));
      await ventanitaChat.click();
      await ventanitaChat.sendKeys("Hola\n ");
      let botonEnviar = await this.driver.findElement(By.xpath('//button[@type="submit" and contains(@class, "send")]'));
    }*/




  }
});

Then('Cierro el browser', async function () {
  await this.driver.quit();
})