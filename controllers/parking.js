const Parking = require ('../models/parking')

module.exports = app => {
  app.get('/parking', (req, res) => {
    Parking.list(res)
  })

  app.get('/parking/:id', (req, res) =>{
    const id = parseInt (req.params.id)

    Parking.searchById(id, res)
  })

  app.post('/parking', (req, res) =>{
    const parking = req.body

    Parking.add(parking, res)
  })

  app.patch('/parking/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const values = req.body

    Parking.alter(id, values, res)
  })

  app.delete('/parking/:id', (req, res) =>{
    const id = parseInt(req.params.id)

    Parking.delete(id, res)
  })
}