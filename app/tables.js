class Tables {
  init(connection){
    this.connection = connection

    this.createParking()
  }

  createParking(){
    const sql = 'CREATE TABLE IF NOT EXISTS parking(id int NOT NULL AUTO_INCREMENT, customer varchar(50) NOT NULL, car varchar(30), date datetime NOT NULL, dateCreated datetime NOT NULL, status varchar(20) NOT NULL, obs text,  PRIMARY KEY (id))'

    this.connection.query(sql, (error) =>{
      if(error){
        console.log(error)
      } else {
        console.log('Table create successfully!')
      }
    })
  }
}

module.exports = new Tables
