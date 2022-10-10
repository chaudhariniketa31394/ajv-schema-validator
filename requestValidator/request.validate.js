
const Ajv = require("ajv")


const addFormats = require("ajv-formats")
const ajv = new Ajv.default({ allErrors: true, verbose: true })// code: { source: true, formats: MyFormat } 

// ajv.addFormat("email", /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
ajv.addFormat("mobile", /^[6789]\d{9}$/);
ajv.addFormat("zip", /\b\d{6}\b/g);
ajv.addKeyword('isNotEmpty', {
    type: 'string',
    validate: function (schema, data) {
        return typeof data === 'string' && data.trim() !== ''
    },
    errors: false
})
addFormats(ajv)


module.exports = async function validatePayload(schemaObj, payloadObj) {
    try {
        const data = payloadObj
        const validate = ajv.compile(schemaObj)
        const valid = validate(data)
        if (valid) return valid
        if (!valid) throw validate.errors
    } catch (error) {
        const errorObj = {
            statusCode: 404,
            message: `${error[0].instancePath} ${error[0].message}`.replace(/[/]/g, ' '),
            errorCode: 404
        }
        return errorObj
    }
}


// ajv.addKeyword({
//     keyword: 'isNotEmpty',
//     validate: (schema:any , data:any) => {
//         if (schema){
//             return typeof data === 'string' && data.trim() !== ''
//         }
//         else return true;
//     }
// });
// ajv.addKeyword({
//     keyword: 'isNotEmpty',
//     schemaType: 'boolean',
//     type: 'string',
//     code(cxt: KeywordCxt) {
//       const {data, schema} = cxt;
//       if (schema) {
//         cxt.fail(_`${data}.trim() === ''`);
//       }
//     },
//     error: {
//       message: 'string field must be non-empty'
//     }
//   });


