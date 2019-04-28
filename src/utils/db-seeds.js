import faker from 'faker'

const generateUsers = async (num, model) => {

  await model.create({
    email: 'enzo@aliatis.com',
    fullname: 'Enzo Aliatis',
    password: 'enzoenzo',
    phone: '0989730005',
    city: 'manta',
    country: 'Ecuador',
    company: 'Ducktyping',
   })

  for(let i = 0; i < num-1; i++) {
     await model.create({
      email: faker.internet.email(),
      fullname: faker.name.findName(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
      city: faker.address.city(),
      country: faker.address.country(),
      company: faker.company.companyName(),
     })
  }

  console.log('|-----------------------SEEDS----SUCCESSFUL-----------------------|')
}

const generateEmployees = async (num, model) => {

  await model.create({
    fullname: 'Leonel Messi',
    password: 'mesimesi',
    phone: '0999999999',
    role: 2,
    userId: 1,
   })

  for(let i = 0; i < num-1; i++) {
     await model.create({
      fullname: faker.name.findName(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
      role: Math.floor(Math.random()*(3-2+1)+2),
      userId: Math.floor(Math.random()*(5-1+1)+1),
     })
  }

  console.log('|-----------------------SEEDS----SUCCESSFUL-----------------------|')
}



export { generateUsers, generateEmployees }