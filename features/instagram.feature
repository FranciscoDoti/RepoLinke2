
Feature: Automatizar el instagram

    Scenario: iniciar sesion en instagram
        Given Abrir la pagina de instagram
        When Iniciar sesion
        And Si aparece el cartel de notificaciones seleccionar "Ahora no"
        And Ir al buscador y escribir "cristinafkirchner"
zº