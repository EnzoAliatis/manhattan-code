import Sequelize from 'sequelize'

let sequelize

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(
    'manhattan-test',
    'postgres',
    'docker',
    {
      dialect: 'postgres',
      host: 'localhost'
    }
  )
} else {
  sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
      host: process.env.DATABASE_END_POINT
    },
  );
}

const models = {
  User: sequelize.import('./user')
}

export { sequelize };

export default models;