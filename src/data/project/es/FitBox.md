---
title: "FitBox app (Académico)"
description: "Este proyecto fue desarrollado en un entorno académico como parte de una asignatura de la Universidad Autónoma de Occidente. A pesar de su contexto educativo, el proyecto fue realizado para un cliente real, con necesidades concretas, logrando una implementación funcional y aplicada al mundo real."
company: "Fitbox"
pubDate: "2-1-2022"
categories: [1, 2]
featured: false
location: "Palmira, Colombia"
technologies: ["logos:php-alt", "logos:react", "logos:mysql", "logos:figma"]
---

## El problema

En FITBOX, un gimnasio con gran demanda, el proceso de asignación de cupos para clases se volvía cada vez más ineficaz y desorganizado. No existía un sistema ágil que permitiera a los alumnos reservar sus clases de forma rápida, segura y sin fricciones. Como resultado:

- Algunos alumnos no podían entrenar con comodidad, debido a la limitación del espacio físico.
- No había control sobre la cantidad de clases asistidas según el plan contratado.
- Los alumnos podían exceder el número de clases, obteniendo beneficios por los que no pagaban.
- El instructor veía incrementada su carga de trabajo, y el administrador perdía ingresos por la falta de control.

### Gestión Manual = Tiempo Perdido

Todo el proceso de asignación de clases se realizaba a través de mensajes de WhatsApp. El administrador debía responder manualmente cada solicitud y asignar clases una por una, generando una carga operativa innecesaria.

Además, el seguimiento de pagos se llevaba en una hoja de Excel, donde se debía revisar manualmente la información de cada alumno: nombre, fecha de pago y monto. Este método resultaba lento, propenso a errores y poco escalable.

### Ventas Limitadas = Oportunidades Perdidas

Actualmente, la venta de proteínas e implementos de entrenamiento solo se realiza de forma presencial en la tienda del gimnasio. Esto ha generado una baja en las ventas, ya que muchos miembros de la comunidad no pueden acercarse fácilmente y terminan comprando estos productos en otros lugares.

FITBOX no solo está perdiendo ventas, sino también la oportunidad de fortalecer su marca y comunidad mediante un canal de ventas digital que facilite la compra de sus productos exclusivos.

## PMV: Alcance y Propósito del Producto

El propósito del producto es desarrollar una solución digital integral para FITBOX que atienda las necesidades más urgentes del gimnasio, priorizadas por el sponsor del proyecto. El enfoque principal es mejorar la gestión operativa, el control de usuarios, y la experiencia digital de clientes, instructores y administradores.

### Alcance del Producto Mínimo Viable

El alcance inicial del PMV contempla las siguientes funcionalidades clave:

#### 🔐 Autenticación y Control de Sesiones

- Inicio y cierre de sesión para los tres perfiles de usuario: Cliente, Instructor y Administrador.
- Control personalizado de sesiones para ofrecer contenido adaptado a cada tipo de usuario.

#### 📅 Gestión de Clases y Reservas

- Los **clientes** podrán:
  - Reservar cupos para clases.
  - Editar o cancelar sus reservas de forma sencilla.
- Los **instructores** tendrán la opción de:
  - Registrar y gestionar sus propios horarios de clases.

#### 💰 Control de Pagos y Clientes Activos

- Visualización por parte del cliente de:

  - Saldos pendientes de pago.
  - Detalles y descripciones de los montos.

- El administrador podrá:
  - Consultar el listado de clientes activos.
  - Utilizar esta información para controlar el acceso a las instalaciones.

#### ⚖️ Herramientas de Salud y Bienestar

- Cálculo automático de:
  - Índice de Masa Corporal (IMC).
  - Recomendación de litros de agua diarios.
- Esta funcionalidad estará disponible tanto para usuarios registrados como para visitantes.

#### 📝 Formulario de Anamnesis

- Registro de un formulario médico por cada cliente.
- Consulta de esta información por parte de los instructores, permitiendo adaptar los entrenamientos a las necesidades individuales.

#### 👤 Registro de Nuevos Usuarios

- Los nuevos usuarios podrán:
  - Registrarse en la plataforma.
  - Crear su perfil personal para empezar a usar los servicios.
