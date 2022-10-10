
var insertRecord = require('../controllers/employeeController')


describe("Calculator tests", () => {

    let obj = {
        "email": "test1@gmail.com",
        "fullName": "niketac",
        "mobile": "9975675736",
        "gender": "Male",
        "Occupation": "Gov",
        "address": {
            "city": "Dhule",
            "pinCode": 424001
        }

    }
    test('insertRecord', () => {
        let result = insertRecord(obj);
        expect(result.StatusCode).toBe(200);
    });
})