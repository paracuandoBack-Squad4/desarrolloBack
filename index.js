const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const routerModels = require('./routes/models.route')
require('dotenv').config()

const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')

const app = express()
const PORT = process.env.PORT || 8000


// swaggers 
const swaggerJSdoc = require('swagger-jsdoc')

const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info:{
      title: '¿Para Cuándo? - API 1.0',
      version: '1.0.0',
      description: 'Es un servidor API 1.0  de la aplicación que sirve para publicar eventos, conciertos y torneos en una fecha determinada haciendo que la comunidad decida dar su apoyo o no para que se realic.   Las personas pueden acceder a una aplicación para que puedan compartir estas publicaciones y también pueden votar a favor de estas o en contra.',
    },
    servers: [
      {
        url: 'http://localhost:8000'
      }
    ]
  },
  apis: ['./routes/models.route.js', './config.js', './swagger-jsdoc']
}

/*
Cors Settings
*/
const whitelist = ['http://localhost:8000']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Denied By CORS'))
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  app.use(cors())
  /* Set security HTTP headers */
  /* For Error ERR_BLOCKED_BY_RESPONSE.NotSameOrigin 200 
       https://stackoverflow.com/questions/70752770/helmet-express-err-blocked-by-response-notsameorigin-200
  */
  app.use(helmet({ crossOriginResourcePolicy: false }))
} else {
  app.use(cors())
}

/*
Accept Json & form-urlencoded
*/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api-v1-paracuando', swaggerUi.serve, swaggerUi.setup(swaggerJSdoc(swaggerSpec)))
//app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

/*
Routes
*/
/* 
    Tell everyone the state of your api
*/
//.
//.
//. 
/*
Routes
*/ 
app.get('/', ({ res }) => {
  res.json({
    api: 'API Join Momentum',
    state: 'Up and Running',
    version: '1.0.0'
  })
}) 
// publicRouter(app)
// docsRouter(app)
// thirdPartyServicesRouter(app)
<<<<<<< HEAD
routerModels(app) 
routerErrorHandler(app)
//Here we can add others

=======
routerModels(app) //Here we can add others
>>>>>>> parent of 5e2bee5 (feat middleware and route error)
// errorHandlerRouter(app) 
app.get('/', ({ res }) => {
  return res.json({
    status: 'Up',
    maintenance: false,
  })
}) 

app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`)
})
