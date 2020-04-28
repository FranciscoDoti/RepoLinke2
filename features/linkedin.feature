@Linkedin
Feature: Automatizar el Linkedin

    @AceptarInvitaciones
    Scenario Outline: Aceptar todas las invitaciones
        Given Abrir la pagina de Linkedin
        When Inicio sesion en Linkedin con usuario <usuario> y contraseña <contraseña>
        And Ir a la seccion Mi Red
        And Pongo para ver todas las invitaciones
        Then Acepto todas las invitaciones
        Examples:
            | usuario                             | contraseña   |
            | lourdesdotitexeira@gmail.com        | soldecolores |
            | franciscodotitexeira@gmail.com      | Yosoyyo123   |
            | Alejandro.javierbettini@hotmail.com | Shamshiadad1 |

    @MandarInvitaciones
    Scenario Outline: Mandarle invitaciones a todo el mundo en Linkedin
        Given Abrir la pagina de Linkedin
        When Inicio sesion en Linkedin con usuario <usuario> y contraseña <contraseña>
        And Busco los usuarios con el filtro que quiero

        Examples:
            | usuario                             | contraseña     |
            | lourdesdotitexeira@gmail.com        | soldecolores   |
            | franciscodotitexeira@gmail.com      | Yosoyyo123     |
            | Alejandro.javierbettini@hotmail.com | Shamshiadad1   |
            | flynnana@gmail.com                  | azulrey3       |
            | santi.bozzo@gmail.com               | DRcaligari1919 |
