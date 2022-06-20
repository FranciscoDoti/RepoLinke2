const { setWorldConstructor, setDefaultTimeout, setDefinitionFunctionWrapper } = require('cucumber');


function ThisWorld({ attach }) {


  setDefaultTimeout('9000000');

};

setWorldConstructor(ThisWorld);

setDefinitionFunctionWrapper((fn) => {
  return async function () {
    await fn.apply(this, arguments);
    if (this.screenshots !== undefined && this.screenshots.toLowerCase().includes("always")) {
      try {
        await this.attach(await this.driver.takeScreenshot(), "image/png");
      } catch (ex) {
        log.error(ex);
      }
    }
  };
});

