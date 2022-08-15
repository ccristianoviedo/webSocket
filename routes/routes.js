const express = require('express')
const router = express.Router()

const datos = []

router.get("/", (req, res) => {
    try {
        res.render('form', {datos});
    } catch (error) {
        res.status(500).json({error: error})
    }
   
})
router.get("/tablaEjs", (req, res) => {
    try {
        res.render("partials/tabla", {datos});
    } catch (error) {
        res.status(500).json({error: error})
    }
    
})
router.post("/personas", (req, res) => {
    try {
        datos.push(req.body)
        res.render('form', {datos});
    } catch (error) {
        res.status(500).json({error: error}) 
    }
    
})
 module.exports= router;