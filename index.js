const express = require('express')
const mongoose = require('mongoose');

require('dotenv').config()
const app = express()
const port = process.env.PORT || 8000


// ORM Mongoose
mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_ADRESSE}:${process.env.MONGO_PORT}`)


const Customer = mongoose.model('Customer', {firstname: String, lastname: String});

app.use(express.json())

// Routes express
app.get('/', (req, res) => {
    res.send('Hello World!')

})


app.get('/customers', (req, res) => {
    Customer.find({}, (err, customers) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(customers)
        }
    })
})

app.get('/customers/:id', (req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(customer)
        }
    })
    
})

app.post('/customers', (req, res) => {
    const data = req.body
    console.log(data)
    const customer = new Customer(data)
    customer.save().then(dataDB => {
        console.log(dataDB)
        res.send(dataDB)
    } )

})

app.put('/customers/:id', (req, res) => {
    const data = req.body
    Customer.findByIdAndUpdate(req.params.id, data, (err, customer) => {
        if(err) {
            res.status(500).send(err)
        } else {   
            res.status(200).send(customer)
        }
    })
})

app.delete('/customers/:id', (req, res) => {
    const data = req.body
    Customer.findByIdAndDelete(req.params.id, data, (err, customer) => {
        if(err) {
            res.status(500).send(err)
        } else {   
            res.status(200).send(customer)
        }
    }
    )
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
