require('dotenv').config();
const axios = require('axios');
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    const fileName = path.join(__dirname, 'index.html')
    res.sendFile(fileName, (error) => {
        if (error) {
            return res.send(error);
        }
        return;
    })
})

app.post('/', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const apikey = process.env.APIKEY;
        const redirectUrl = process.env.REDIRECT;
        const domainName = process.env.DOMAINNAME;
        const response = await axios.post('https://2fa-client.cyclic.app/sendotp', { userEmail, apikey, redirectUrl, domainName })
        if (response.data.success) {
            return res.redirect(response.data.redirectTo)
        }
    } catch (error) {
        if (error?.response?.data?.error) {
            return res.send(error.response.data)
        }
        return res.send(error)
    }
})

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`)
})
