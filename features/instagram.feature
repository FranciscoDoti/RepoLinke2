
Feature: Automatizar el instagram

    Scenario: iniciar sesion en instagram
        Given Abrir la pagina de instagram
        When INSTA. Iniciar sesion con usuario "1166553290" y contraseña "trevi123"
        And Si aparece el cartel de notificaciones seleccionar "Ahora no"
        And Ir al buscador y escribir "institutomadero"