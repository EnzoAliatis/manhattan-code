import faker from 'faker'

const generateUsers = async (num, model) => {

  for(let i = 0; i < num; i++) {
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


export { generateUsers }