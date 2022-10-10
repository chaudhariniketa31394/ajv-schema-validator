const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
var createUserSchema = require('../requestModels/createuser')
const validatePayload = require('../requestValidator/request.validate')

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) => {

    console.log("req.body", req.body)
    if (!req.body._id)
        insertRecord(req, res);
    else
        updateRecord(req, res);
});


exports.module = async function insertRecord(req, res) {
    console.log("createUserSchema", createUserSchema)
    const validate = await validatePayload(createUserSchema, req.body);
    console.log("validate", validate)
    console.log("inser records", req.body)
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.Occupation = req.body.Occupation;
    employee.address = req.body.address;
    employee.save((err, doc) => {
        console.log("errr", err, "result", doc)
        if (!err)
            res.send({ StatusCode: 200, IsRequestSuccessfull: true, Data: doc })
        else
            res.send({ StatusCode: 400, IsRequestSuccessfull: false, err })
    });
}

function updateRecord(req, res) {
    console.log("inside update records")
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {

            console.log("errror", docs)
            res.send({
                StatusCode: 200,
                IsRequestSuccessfull: true,
                List: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;