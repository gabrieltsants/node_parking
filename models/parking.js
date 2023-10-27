const moment = require('moment')
const connection = require('../app/conn')

class Parking {
  add(parking, res){
    const dateCreated = moment().format('YYYY-MM-DD HH:MM:SS')
    const date = moment(parking.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

    const validateCustomer = parking.customer.lenght >= 3

    const validations = [
      {
        name: 'customer',
        valid: validateCustomer,
        message: 'Customer must have at least 3 characters'
      }
    ]

    const errorrs = validations.filter(field => !field.valid)
    const haveErrors = errorrs.lenght

    if (haveErrors){
      res.status(400).json(errorrs)
    } else {
      const parkingWithDate = {...parking, dateCreated, date}

      const sql = 'INSERT INTO parking SET ?'

      connection.query(sql, parkingWithDate, (errorr, results) =>{
        if(errorr){
          res.status(400).json(errorr)
        } else {
          res.status(201).json(parking)
        }
      })
    }
  }

  list(res){
    const sql = 'SELECT * FROM parking'

    connection.query(sql, (error, results) => {
      if (error){
        res.status(400).json(error)
      } else {
        res.status(200).json(results)
      }
    })
  }

  searchById(id, res){
      const sql = ` SELECT * FROM parking WHERE id=${id} ` 

      connection.query(sql, (error, results) => {
          const parking = results[0]
          if (error) {
              res.status(400).josn(error)
          } else {
              res.status(200).json(parking)
          }

      })
  }

  alter(id, values, res){
      if(values.date){
          values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
      }
      const sql = 'UPDATE parking SET ? WHERE id=?'

      connection.query(sql, [values, id], (error, resuts) =>{
          if(error){
              res.status(400).json(error)
          } else {
              res.status(200).json({...values, id})
          }
      })
  }

  delete(id, res){
      const sql = 'DELETE FROM parking WHERE id=?'

      connection.query(sql, id, (error, results) => {
          if(error){
              res.status(400).json(error)
          } else {
              res.status(200).json({id})
          }
      })
  }

}

module.exports = new Parking
