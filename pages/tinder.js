let WElements = {

    WEemail: '//*[@id="email"]',
    WEcontraseña: '//*[@id="pass"]',
    WEiniciarSesionFb: '//button[@aria-label="Inicia sesión con Facebook"]', //button[@aria-label="Inicia sesión con Facebook"]
    WEentrar: '//input[@value="Entrar"]',
    WEcorazon: '//button[@aria-label="Me gusta"]',
    WEsuperlike: '//button[@aria-label="Super Like"]',
    WErechazo: '//button[@aria-label="Nope"]',
    
    WEpermitir: '//button[@type="button" and @aria-label="Permitir"]', 
    WEhabilitar: '//button[@type="button"and @aria-label="Habilitar"]',
    WEacepto: '//button[@type="button" and @draggable="false"]/span[(.="Acepto")]',
    WEbotonNO: '//span[.= "No, gracias"]',
    WEmasOpciones: '//button[.="Más opciones"]',
    WeCampoMensajeMatch: '//textarea[@id="chat-text-area"]',
    WeBotonEnviarMsjMatch: '//button[@type="submit"]',
    WeTextoLeGustasA: '//div[contains(text(), "le gustas")]'

};

module.exports = {
    WElements
};