@Linkedin
Feature: Automatizar el Linkedin

    @MandarInvitaciones
    Scenario Outline: Mandarle invitaciones a todo el mundo en Linkedin
        Given Abrir la pagina de Linkedin
        When Inicio sesion en Linkedin con usuario <usuario> y contraseña <contraseña>
        And Busco los usuarios con el filtro que quiero

        Examples:
            | usuario                             | contraseña   |
            | lourdesdotitexeira@gmail.com        | soldecolores |
            | franciscodotitexeira@gmail.com      | Yosoyyo123   |
            | Alejandro.javierbettini@hotmail.com | Shamshiadad1 |


    @ejecucionDiaria
    Scenario: Mandarle mensaje a todos los contactos en Linkedin
        Given Abrir la pagina de Linkedin
        When Inicio sesion en Linkedin
        And Abro Pagina de Mensajes
        Then le entro a mandar mensaje a todo el mundo