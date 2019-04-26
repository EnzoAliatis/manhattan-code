import Sequelize from 'sequelize'

let sequelize
const timezone = '+05:00'

if (process.env.NODE_ENV === 'test') {

  sequelize = new Sequelize({
    database: 'manhattan-test',
    username: 'postgres',
    password: 'docker',
    host: 'localhost',
    dialect: 'postgres'
  })
} else {
  sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
      host: process.env.DATABASE_END_POINT,
      timezone: 'UTC -5'
    },
  );
}

const models = {
  User: sequelize.import('./user'),
  Employee: sequelize.import('./employee')
}


// "En el mismo archivo,
// puede asociar físicamente todos sus modelos entre sí para exponerlos
//  a su aplicación como capa de acceso a datos (modelos) para la base de datos"
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize };

export default models;