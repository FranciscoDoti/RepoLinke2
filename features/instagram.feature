
Feature: Automatizar el instagram

    Scenario: Seguir gente
        Given Abrir la pagina de instagram
        When INSTA. Iniciar sesion con usuario "lourdesdotitexeira@gmail.com" y contraseña "soldecolores"
        And Si aparece el cartel de notificaciones seleccionar "Ahora no"
        And Ir a Ver Todo en el menú Sugerencias para ti
        And Seguir a cuentas de la lista