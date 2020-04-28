
Feature: Automatizar el instagram

    Scenario: Seguir gente
        Given Abrir la pagina de instagram
        When INSTA. Iniciar sesion con usuario "consultas@habilidadesparaelcambio.com.ar" y contraseña "SomosHabilidades3110"
        And Si aparece el cartel de notificaciones seleccionar "Ahora no"
        And Ir a Ver Todo en el menú Sugerencias para ti
        And Seguir a cuentas de la lista