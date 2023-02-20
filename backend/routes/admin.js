var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
const adminhelpers = require('../controllers/adminController')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// =======================admin login=======================
router.post('/adminlogin', function (req, res) {
  const valid = {
    email: "admin@gmail.com",
    password: '12345'
  }
  console.log("body mail", req.body.admin.email);
  console.log("body pass", req.body.admin.password);
  if (valid.email == req.body.admin.email && valid.password == req.body.admin.password) {
    console.log("logged success")
    let token = jwt.sign({ admin: valid.email }, 'kooi', { expiresIn: '5000' });
    console.log(token);
    res.json({
      status: "success",
      message: "admin verified",
      token,
    })
  } else {
    console.log("failed", valid.email, valid.password);
    console.log(req.body.admin.email);
    res.json({
      status: "failed"
    })
  }


})
// to  list out the cars===============================
router.get('/carslist', function (req, res) {
  adminhelpers.getcars().then((resp) => {
    console.log(resp[0].result1[0], resp[0].result2[0]);
    console.log(resp[0].name);
    res.json({
      carname: resp
    })

  }).catch((err) => {
    console.log(err);
  })




})
// to list out brands=================================
router.get('/brandslist', function (req, res) {
  adminhelpers.getbrands().then((resp) => {
    res.json({
      brands: resp
    })


  })
})
// to list out the location list======================
router.get('/locationlist', function (req, res) {
  adminhelpers.getlocation().then((resp) => {
    res.json({
      location: resp
    })
  })
})
// To add a car ========================
router.post('/addcar', function (req, res) {
  adminhelpers.addCar(req.body.mycar).then((resp) => {
    res.json({

    })
  })

})
//  delete a car===================================
router.delete('/deletecar/:id', function (req, res) {
  adminhelpers.deletecar(req.params.id).then((resp) => {
    res.json({
      status: true
    })
  })
})

// ===to update the car==========================
router.post('/updatecar/:id', function (req, res) {
  console.log(req.body);
  adminhelpers.updatecar(req.params.id, req.body.mycar).then((resp) => {
    res.json({
      update: true
    })
  })
})

// for booking===============================
router.post('/bookcar/:id', function (req, res) {
  console.log(req.body);
  if (req.body.myCardate === '' || req.body.myCarlocation === '') {
    res.json({
      booked: false
    })
  } else {
    adminhelpers.bookings(req.params.id, req.body.myCardate, req.body.myCarlocation).then(() => {
      res.json({
        booked: true
      })

    })
  }

})

module.exports = router;
