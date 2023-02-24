import {gql} from "apollo-server-express";
import {find, remove} from "lodash";

const peoplesArray = [
    {
        id: '1',
        firstName: 'Bill',
        lastName: 'Gates'
    },
    {
        id: '2',
        firstName: 'Steve',
        lastName: 'Jobs'
    },
    {
        id: '3',
        firstName: 'Linux',
        lastName: 'Torvalds'
    }
]

const carsArray = [
    {
        id: '1',
        year: '2019',
        make: 'Toyota',
        model: 'Corolla',
        price: '40000',
        personId: '1'
    },
    {
        id: '2',
        year: '2018',
        make: 'Lexus',
        model: 'LX 600',
        price: '13000',
        personId: '1'
    },
    {
        id: '3',
        year: '2017',
        make: 'Honda',
        model: 'Civic',
        price: '20000',
        personId: '1'
    },
    {
        id: '4',
        year: '2019',
        make: 'Acura ',
        model: 'MDX',
        price: '60000',
        personId: '2'
    },
    {
        id: '5',
        year: '2018',
        make: 'Ford',
        model: 'Focus',
        price: '35000',
        personId: '2'
    },
    {
        id: '6',
        year: '2017',
        make: 'Honda',
        model: 'Pilot',
        price: '45000',
        personId: '2'
    },
    {
        id: '7',
        year: '2019',
        make: 'Volkswagen',
        model: 'Golf',
        price: '40000',
        personId: '3'
    },
    {
        id: '8',
        year: '2018',
        make: 'Kia',
        model: 'Sorento',
        price: '45000',
        personId: '3'
    },
    {
        id: '9',
        year: '2017',
        make: 'Volvo',
        model: 'XC40',
        price: '55000',
        personId: '3'
    }
]

const typeDefs = gql`
    type Person {
        id: String!
        firstName: String
        lastName: String
    },
    
    type Car {
        id: String!
        year: String
        make: String
        model: String
        price: String
        personId: String!
    }
  
    type Query {
        peoples: [Person]
        people(id: String): Person
        
        car(id: String!): Car
        cars: [Car]
    }
    
    type Mutation {
       addPerson(id: String!, firstName: String!, lastName: String!): Person
       updatePerson(id: String!, firstName: String, lastName: String): Person
       removePerson(id: String!): Person
        
       addCar(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
       updateCar(id: String!, year: String, make: String, model: String, price: String, personId: String): Car
       removeCar(id: String!): Car
    }
    
    `

    const resolvers = {
        Query: {
         peoples: () => peoplesArray,
            people: (root, args) => {
                return find(peoplesArray, {id: args.id})
            },

            cars: () => carsArray,
            car: (root, args) => {
                return find(carsArray, {id: args.id})
            }
        },
        Mutation: {
            // Person CRUD operation
            addPerson: (root, args) => {
                const newPerson = {
                    id: args.id,
                    firstName: args.firstName,
                    lastName: args.lastName,
                }
                peoplesArray.push(newPerson)

                return newPerson
            },

            updatePerson: (root, args) => {
                const person = find(peoplesArray, {id: args.id})

                if(!person) throw new Error(`Could not find the person with id ${args.id} not exist`)

                    person.firstName = args.firstName
                    person.lastName = args.lastName

                return person
            },

            removePerson: (root, args) => {
                const removedPerson = find(peoplesArray, {id: args.id})
                const carsFound = find(carsArray, {personId: args.id})

                if(!removedPerson) throw new Error(`Could not find the person with id ${args.id} not exist`)

                remove(carsArray, c => {
                    return c.personId === removedPerson.id
                })
                remove(peoplesArray, p => {
                    return p.id === removedPerson.id
                })

                return removedPerson
            },


            // Car CRUD operation
            addCar: (root, args) => {
                const newCar = {
                    id: args.id,
                    year: args.year,
                    make: args.make,
                    model: args.model,
                    price: args.price,
                    personId: args.personId
                }

                carsArray.push(newCar)

                return newCar
            },
            updateCar: (root, args) => {
                const car = find(carsArray, {id: args.id})

                if(!car) throw new Error(`Could not find the car with id ${args.id} not exist`)

                    car.year = args.year,
                    car.make = args.make,
                    car.model = args.model,
                    car.price = args.price,
                    car.personId = args.personId

                return car
            },

            removeCar: (root, args) => {
                const removedCar = find(carsArray, {id: args.id})

                if(!removedCar) throw new Error(`Could not find the car with id ${args.id} not exist`)

                remove(carsArray, c => {
                    return c.id === removedCar.id
                })

                return removedCar
            }
        }
    }

    export { typeDefs, resolvers}







