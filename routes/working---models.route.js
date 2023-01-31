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
 *   - name: sign-up
 *     description: Crea un Usuario junto con su respectivo Perfil único.
 *   - name: login
 *     description: Devuelve el token que se usará para las peticiones a rustas protegidas desde Front End.
 *   - name: user-info
 *     description: Registra información básica del Usuario y su Perfil para poder hacer peticiones con base en el "token" recibido.
 *   - name: recovery-password
 *     description: Se solicita un cambio de contraseña, para lo que se genera un "token" con fecha de expiración en la tabla de usuarios. Se envía el token al usuario via E-Mail junto con un enlace a una ruta sin protección de auth para que el usuario haga Post junto con el cambio de la contraseña.  Si se verifica que el token es legítimo, entonces se realiza el cambio de contraseña solicitado.
 *   - name: publications-types
 *     description: CRUD de los tipos de publicaciones.
 *   - name: publications
 *     description: CRUD de publicaciones.
 *   - name: user
 *     description: CRUD de los usuarios con restricciones de acceso y consultas con asociaciones (votos, publicaciones, etc).
 *   - name: users
 *     description: Retorna todos los usuarios - Vista administrativa con paginación.
 *   - name: countries
 *     description: GetAll. Retorna todos los paises. 
 *   - name: cities
 *     description: GetAll. Retorna todas las ciudades. 
 *   - name: roles
 *     description: GetAll. Retorna todos los roles. 
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
 *        - sign-up
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
 *        - login
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
 *        - user-info
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
 *        - recovery-password
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
 *  /api/v1/publications_types:
 *    get:
 *      tags:
 *        - publications-types
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
