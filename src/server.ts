import express from 'express'

import {router} from 

app.use(express.json())

app.use(router)

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

mongoose
.connect('mongodb://localhost:27017/expense-tracker')
    .then(() => {
        app.listen(3000, () => console.log('Server is running on port 3000'))
        console.log('Connected to MongoDB')})
    .catch((err: any) => console.error(err))