const app = require('./app.js')
const logger = require('./config/logger.js')
const port = 4000

app.listen(port,()=>{
    // console.log(`the server is listening on port ${port}`);
    // logger.log('error',`the server is listening on port ${port}`)
    logger.warn(`the server is listening on port ${port}`)
})



