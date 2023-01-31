const express = require('express')
const routesUsers = require('./users.route')
const routesCountries = require('./countries.route')
const routesState = require('./state.route')
const routesCities = require('./city.route')
const routesPublications = require('./publications.route')
const routesPublicationsType = require('./publications_type.route')
const routesLogin = require('../auth/auth.route')
const routerRoles = require('./roles.route')
const routesTags = require('./tags.route')
const passport = require('passport')
const { getUsers, addUser, getInfoUser } = require('../controllers/users.controllers')
const isAdmin = require('../middlewares/isAdmin.middleware')
require('../middlewares/auth.middleware')(passport)

// tags
/**
 * @swagger
 * tags:
 *   - name: Autenticación
 *     description: Usuario podra, registrarse, poderá obtener su token, asi mismo podra ver su información personal y po ultimo podra editar su contraseña.
 *   - name: PublicationsTypes
 *     description: Devuelve el token que se usará para las peticiones a rustas protegidas desde Front End.
 *   - name: Publications
 *     description: el usuario podra crear, ver sus publicaciónes, y asi mismo podra realizar su respectivo voto
 *   - name: User
 *     description: el usuario podra ver, editar su información personal. asi mismo podra ver los votos que realizo como las publicación que realizó.
 *   - name: States
 *     description: el usuario podra ver todo los estados actuales
 *   - name: Cities
 *     description: el usuario podra ver todas las ciudades actuales
 *   
 *      
 *     
 */

// CRUDS
 
/**
 * @swagger
 * paths:
 *  /api/v1/sign-up:
 *    post:
 *      tags:
 *        - Autenticación
 *      summary: Crea un Usuario junto con su respectivo Perfil único.
 *      requestBody: 
 *        description: Crea un Usuario junto con su respectivo Perfil único.
 *        content:
 *          application/json:
 *            schema:                      
 *               $ref: '#/components/schemas/sign-up'
 *      responses:
 *       '201':
 *         description: (Ok) la información del usuario se guardó correctamente.
 *         content:
 *           application/json:
 *             schema:                      
 *              $ref: '#/components/schemas/sign-up'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '504':
 *         $ref: '#/components/responses/ServerError'
 * 
 * 
 * 
 * 
 *  /api/v1/login:
 *    post:
 *      tags:
 *        - Autenticación
 *      summary: Verifica la coinsidencia de email y password y entrega como respuesta el token de autenticación.
 *      requestBody: 
 *        description: Verifica la coinsidencia de email y password y entrega como respuesta el token de autenticación.
 *        content:
 *          application/json:
 *            schema:                      
 *               $ref: '#/components/schemas/login'
 *      responses:
 *       '200':
 *         description: (Ok) se autoriza el ingreso y se entrega el token correspondiente.
 *         content:
 *           application/json:
 *            schema:                      
 *             $ref: '#/components/schemas/LogedWithToken'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         description:  (RejectedLogin) no hay autorización para ingresar
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de credenciales inválidas   
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 * 
 * 
 *  /api/v1/user-info:
 *    get:
 *      tags:
 *        - Autenticación
 *      summary: Regresará la información básica del Usuario para poder hacer peticiones en base al token recibido.
 *      responses:
 *       '201':
 *         description: (Ok) se retorna la información del usuario y de su respectivo perfil.
 *         content:
 *           application/json:
 *              schema: 
 *                $ref: '#/components/schemas/RecordedProfile'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *        - jwtAuth: []
 * 
 * 
 * 
 * 
 * 
 *  /api/v1/recovery-password:
 *    post:
 *      tags:
 *        - Autenticación
 *      summary: Se solicita un cambio de contraseña, para lo que se genera un "token" con fecha de expiración en la tabla de usuarios. Se envía el token al usuario via E-Mail junto con un enlace a una ruta sin protección de auth para que el usuario haga Post junto con el cambio de la contraseña.  Si se verifica que el token es legítimo, entonces se realiza el cambio de contraseña solicitado.
 *      requestBody: 
 *        description: Recibe email.
 *        content:
 *          application/json:
 *            schema:                      
 *               $ref: '#/components/schemas/RecoveryEmail'
 *      responses:
 *       '201':
 *         description: (Ok) se genera el registro en de recovery_passwords y se envía un email con el enlace para llevar a cabo el cambio.
 *         content:
 *           application/json:
 *             schema:                      
 *                $ref: '#/components/schemas/PasswordRecoveryCommited'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 * 
 * 
 *  /api/v1/publications:
 *    post:
 *      tags:
 *        - Publications
 *      summary: el usuario podra crear una publicación
 *      requestBody: 
 *        description: el usuario podra crear una publicación.
 *        content:
 *          application/json:
 *            schema:                      
 *               $ref: '#/components/schemas/addPublications'
 *      responses:
 *       '201':
 *         description: (Ok) se crea la publicación del usuario.
 *         content:
 *           application/json:
 *             schema:                      
 *                $ref: '#/components/schemas/addPublications'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *         - jwtAuth: []
 * 
 * 
 *    get:
 *      tags:
 *        - Publications
 *      summary: el usuario podra ver sus publicaciones
 *      responses:
 *       '201':
 *         description: (Ok) el usuario podra ver sus publicaciones.
 *         content:
 *           application/json:
 *             schema:                      
 *                $ref: '#/components/schemas/getPublications'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *         - jwtAuth: []
 * 
 * 
 *  /api/v1/publications/{id}:
 *    get:
 *      tags:
 *        - Publications
 *      summary: el usuario podra ver su publicacione, según su ID
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: the publication id
 *      responses:
 *       '201':
 *         description: el usuario podra ver su publicacione, según su ID.
 *         content:
 *           application/json:
 *             schema:                      
 *                $ref: '#/components/schemas/getPublications'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *         - jwtAuth: []
 * 
 * 
 *    delete:
 *      tags:
 *        - Publications
 *      summary: el usuario podra eliminar su publicacion, según su ID
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: the publication id
 *      responses:
 *       '201':
 *         description: (OK) publicación eliminada.
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *         - jwtAuth: []
 * 
 * 
 *  /api/v1/publications/{id}/vote:
 *    post:
 *      tags:
 *        - Publications
 *      summary: el usuario podra votar una publicación
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: the publication id
 *      requestBody: 
 *        description: el usuario podra hacer su voto respectivo.
 *        content:
 *          application/json:
 *            schema:                      
 *               $ref: '#/components/schemas/postVote'
 *      responses:
 *       '201':
 *         description: (OK) voto exitoso¡.
 *         content:
 *           application/json:
 *             schema:                      
 *                $ref: '#/components/schemas/postVote'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *         - jwtAuth: []
 * 
 * 
 *    get:
 *      tags:
 *        - Publications
 *      summary: el usuario podra ver sus votos
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: the publication id
 *      responses:
 *       '200':
 *         description: (OK) votos.
 *         content:
 *           application/json:
 *             schema:                      
 *                $ref: '#/components/schemas/postVote'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *         - jwtAuth: []
 * 
 * 
 * 
 *    delete:
 *      tags:
 *        - Publications
 *      summary: el usuario podra eliminar su voto
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: the publication id
 *      responses:
 *       '201':
 *         description: (OK) voto eliminado.
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *         - jwtAuth: []
 * 
 * 
 * 
 * 
 *  /api/v1/publications_types:
 *    get:
 *      tags:
 *        - PublicationsTypes
 *      summary: Informa la lista de tipos de publicaciones.
 *      responses:
 *       '200':
 *         description: (Ok) se retorna la lista
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Mensaje   
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *        - jwtAuth: []
 * 
 * 
 *  /api/v1/publications_types/{id}:
 *    get:
 *      tags:
 *        - PublicationsTypes
 *      summary: se retorna el tipo de publicación.
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: the publications_types id
 *      responses:
 *       '200':
 *         description: (Ok) tipo de publicación exitosa.
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *        - jwtAuth: []
 * 
 * 
 *  /api/v1/user/{id}:
 *    get:
 *      tags:
 *        - User
 *      summary:  información del usuario.
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: the user id
 *      responses:
 *       '200':
 *         description: (Ok) usuario exitoso.
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *        - jwtAuth: []
 * 
 * 
 *    patch:
 *      tags:
 *        - User
 *      summary: el usuario podra editar su información.
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: the user id
 *      requestBody: 
 *        description: el usuario podra modificar su información.
 *        content:
 *          application/json:
 *            schema:                      
 *               $ref: '#/components/schemas/patchUser'
 *      responses:
 *       '200':
 *         description: (Ok) usuario modificado exitoso.
 *         content:
 *           application/json:
 *             schema:                      
 *                $ref: '#/components/schemas/patchUser'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *        - jwtAuth: []
 * 
 * 
 *  /api/v1/user/{id}/publications:
 *    get:
 *      tags:
 *        - User
 *      summary: el usuario podra ver todas las publicaciones que realizo.
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: the user id
 *      responses:
 *       '200':
 *         description: (Ok) publicaiones del usuario exitoso.
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *        - jwtAuth: []
 * 
 * 
 *  /api/v1/user/{id}/votes:
 *    get:
 *      tags:
 *        - User
 *      summary: el usuario podra ver todo sus votos que realizo.
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: the user id
 *      responses:
 *       '200':
 *         description: (Ok) votos del usuario exitoso.
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *        - jwtAuth: []
 * 
 * 
 *  /api/v1/users:
 *    get:
 *      tags:
 *        - Users
 *      summary: Ruta de mantenimiento disponible solo para usuarios con rol de 'admin'.
 *      description: Reporta la lista de los usuarios.  Acepta parámetros de paginación 'page' y 'size'.
 *      parameters:
 *        - name: page
 *          in: query
 *          description: page to browse at once
 *          required: false
 *          explode: true
 *        - name: size
 *          in: query
 *          description: page to browse at once
 *          required: false
 *          explode: true
 *      responses:
 *       '200':
 *         description: (Ok) se retorna la lista
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                results:
 *                  type: object
 *                  properties:
 *                    count:
 *                      type: integer
 *                    totalPages:
 *                      type: integer
 *                    currentPage:
 *                      type: integer
 *                    results:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/RecordedUser'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *        - jwtAuth: []
 * 
 * 
 *  /api/v1/states:
 *    get:
 *      tags:
 *        - States
 *      summary: el usuario podra ver el estado actual.
 *      responses:
 *       '200':
 *         description: (Ok) se retorna el estado actual
 *         content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/states'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *        - jwtAuth: []
 * 
 *  /api/v1/cities:
 *    get:
 *      tags:
 *        - Cities
 *      summary: el usuario podra ver todas las ciudades actuales.
 *      responses:
 *       '200':
 *         description: (Ok) se retorna la ciudad actual
 *         content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/cities'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 * 
 *      security:
 *        - jwtAuth: []
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *                                    
 */ 


/**
 * @swagger
 * components:
 *  securitySchemes:
 *    jwtAuth:
 *      {
 *        description: JWT before insert token,
 *        type: 'apiKey',
 *        in: 'header',
 *        name: 'Authorization'
 *      }
 * 
 *  schemas: 
 *     sign-up:
 *        type: object
 *        properties: 
 *          first_name:
 *             type: string
 *             description: user first name
 *          last_name:
 *             type: string
 *             description: user last name
 *          email:
 *             type: string
 *             description: user email
 *          username:
 *             type: string
 *             description: user username
 *          password:
 *             type: string
 *             description: user password
 *          profile:
 *             type: object
 *             properties: 
 *                image_url:
 *                    type: string
 *                    description: user image
 *                code_phone:
 *                    type: integer
 *                    description: user code phone
 *                phone:
 *                    type: integer
 *                    description: user phone
 *        required: true
 * 
 * 
 *     login:
 *        type: object
 *        properties: 
 *          email:
 *             type: string
 *             description: user email          
 *          password:
 *             type: string
 *             description: user password         
 *        required: true
 * 
 * 
 *     LogedWithToken:
 *        type: object
 *        properties: 
 *          message:
 *             type: string
 *             description: Welcome message         
 *          password:
 *             type: string
 *             description: JWT token         
 *        required: true
 * 
 * 
 *     UserIdQuery:
 *        type: object
 *        properties: 
 *          id:
 *             type: string
 *             description: Id del usuario requerido                 
 *        required: true
 * 
 * 
 *     RecordedProfile:
 *        type: object
 *        properties: 
 *          id:
 *             type: string
 *             format: uuid                
 *          first_name:
 *             type: string                
 *          last_name:
 *             type: string                
 *          username:
 *             type: string                
 *          email:
 *             type: string                
 *          profile:
 *             type: object    
 *             properties:
 *                id:
 *                   type: string 
 *                   format: uuid 
 *                role_id:
 *                   type: integer
 *                   format: int64 
 *                image_url:
 *                   type: string 
 *                code_phone:
 *                   type: integer         
 *                   format: int64         
 *                phone:
 *                   type: integer 
 *                   format: int64 
 *                country_id:
 *                   type: integer       
 *                   format: int64       
 *        required: true
 * 
 * 
 *     RecoveryEmail:
 *        type: object
 *        properties: 
 *          email:
 *             type: string
 *             description: user email          
 *        required: true
 * 
 * 
 *     PasswordRecoveryCommited:
 *        type: object
 *        properties: 
 *          message:
 *             type: string
 *             description: Sent recovery email message         
 *        required: true
 * 
 * 
 * 
 *     addPublications:
 *        type: object
 *        properties: 
 *          publication_type_id:
 *             type: integer      
 *          title:
 *             type: string      
 *          description:
 *             type: string      
 *          content:
 *             type: string      
 *          picture:
 *             type: string      
 *          city_id:
 *             type: integer      
 *          image_url:
 *             type: string      
 *        required: true
 * 
 *  
 *     getPublications:
 *        type: array
 *        properties: 
 *          id:
 *             type: string      
 *             format: uuid      
 *          profile_id:
 *             type: string      
 *             format: uuid      
 *          publication_type_id:
 *             type: integer      
 *          title:
 *             type: string      
 *          description:
 *             type: string      
 *          content:
 *             type: string      
 *          picture:
 *             type: string      
 *          city_id:
 *             type: integer      
 *          image_url:
 *             type: string      
 *        required: true
 * 
 * 
 * 
 *     postVote:
 *        type: object
 *        properties: 
 *          publication_id:
 *             type: string      
 *             format: uuid      
 *          profile_id:
 *             type: string      
 *             format: uuid                  
 *        required: true
 * 
 * 
 *  
 *     patchUser:
 *        type: object
 *        properties: 
 *          first_name:
 *             type: string                    
 *          last_name:
 *             type: string                       
 *          username:
 *             type: string                       
 *        required: true
 * 
 * 
 *     RecordedUser:
 *        type: object
 *        properties: 
 *          id:
 *             type: string
 *             format: uuid                
 *          first_name:
 *             type: string                
 *          last_name:
 *             type: string                
 *          username:
 *             type: string                
 *          email:
 *             type: string
 * 
 *  
 *     states:
 *        type: object
 *        properties: 
 *          id:
 *             type: integer                
 *          country_id:
 *             type: integer                
 *          name:
 *             type: string                 
 *        required: true
 * 
 *     cities:
 *        type: object
 *        properties: 
 *          id:
 *             type: integer                
 *          state_id:
 *             type: integer                
 *          name:
 *             type: string                 
 *        required: true
 * 
 * 
 * 
 *  parameters:
 *   authToken:
 *      name: token
 *      description: Token de autorización JWT
 *      require: true  
 *      schema:
 *        type: string  
 * 
 *  responses:   
 *    Unauthorized:
 *      description: (Unauthorized) no hay autorización para acceder a este servicio  
 * 
 *    NotFound:
 *      description: (NotFound) no se encontró la información
 * 
 *    BadRequest:
 *      description: (BadRequest) los datos enviados son incorrectos o no se completaro datos obligatorios
 * 
 *    ServerError:
 *       description: (ServerError) Error en el servidor
 * 
 *    RejectedLogin:
 *       description: (RejectedLogin) no se ingresaron credenciales válidas
 */ 

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/', routesLogin)
  router.get('/users', passport.authenticate('jwt', { session: false }), isAdmin, getUsers)
  router.post('/sign-up', addUser)
  router.get('/user-info', passport.authenticate('jwt', { session: false }), getInfoUser) 
  router.use('/user', passport.authenticate('jwt', { session: false }), routesUsers)
  router.use('/states', passport.authenticate('jwt', { session: false }), routesState)
  router.use('/countries', passport.authenticate('jwt', { session: false }), routesCountries)
  router.use('/cities', passport.authenticate('jwt', { session: false }), routesCities)
  router.use('/publications', passport.authenticate('jwt', { session: false }), routesPublications)
  router.use('/publications_types', passport.authenticate('jwt', { session: false }), routesPublicationsType)
  router.use('/roles', passport.authenticate('jwt', { session: false }), routerRoles)
  router.use('/tags', routesTags)
}

module.exports = routerModels
