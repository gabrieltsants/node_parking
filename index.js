const customExpress = require('./config/customExpress')
const connection = require('./app/conn')
const tables = require('./app/tables')

connection.connect(error => {
  if (error){
    console.log(error)
  } else {
    console.log('Connected successfully!')

    tables.init(connection)
    const app = customExpress()
    app.listen(3000, () => console.log('Server running in port: 3000'))
  }
})