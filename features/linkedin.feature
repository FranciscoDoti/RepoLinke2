@Linkedin
Feature: Automatizar el Linkedin



    @MandarMensajes
    Scenario Outline: Mandarle invitaciones a todo el mundo en Linkedin
        Given Abrir la pagina de Linkedin
        When Inicio sesion en Linkedin con usuario <usuario> y contraseña <contraseña>
        And Abro Pagina de Mensajes
        And le entro a mandar mensaje a todo el mundo
        Examples:
            | usuario                        | contraseña |
            | franciscodotitexeira@gmail.com | Yosoyyo123 |

    @MandarInvitaciones
    Scenario Outline: Mandarle invitaciones a todo el mundo en Linkedin
        Given Abrir la pagina de Linkedin
        When Inicio sesion en Linkedin con usuario <usuario> y contraseña <contraseña>
        And Busco los usuarios con el filtro que quiero
        Examples:
            | usuario                        | contraseña      |
            | lourdesdotitexeira@gmail.com   | soldecolores    |
            | manuayala93@gmail.com          | Chimichurri1234 |
            | franciscodotitexeira@gmail.com | Yosoyyo123      |
            | Alejandro.javierbettini@hotmail.com | Shamshiadad1 |
# @AceptarInvitaciones
#Scenario Outline: Aceptar todas las invitaciones
#   Given Abrir la pagina de Linkedin
#   When Inicio sesion en Linkedin con usuario <usuario> y contraseña <contraseña>
#   And Ir a la seccion Mi Red
#   And Pongo para ver todas las invitaciones
#   Then Acepto todas las invitaciones
#   Examples:
#       | usuario                             | contraseña   |
#       | lourdesdotitexeira@gmail.com        | soldecolores |
#       | franciscodotitexeira@gmail.com      | Yosoyyo123   |
#       | Alejandro.javierbettini@hotmail.com | Shamshiadad1 |