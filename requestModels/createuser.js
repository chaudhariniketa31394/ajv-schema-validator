module.exports = createUserSchema = {

    type: "object",
    properties: {


        gender: { type: "string", enum: ["Male", "Female"] },
        email: { type: "string", format: "email" },
        fullName: { type: "string" },
        mobile: { type: "string", format: "mobile" },
        address: {
            type: "object",
            properties: {
                city: {
                    type: "string"
                },
                pinCode: {
                    type: "number",
                    format: "zip"

                }
            },
            required: ["city", "pinCode"]
        },

    },

    "if": {
        "properties": {
            "gender": { "const": "Male" }
        },
        // "required": ["gender"]
    },
    "then": {
        "required": ["Occupation"],
        "properties": { "Occupation": { type: "string", enum: ['Gov', 'Private'] } }
    },


    // dependencies: {
    //     gender:
    //     {
    //         properties: {
    //             Occupation: { type: "string", enum: ['Gov', 'Private'] }
    //         }
    //     }
    // },
    required: ["gender", "email", "mobile", "fullName", "address"],
    additionalProperties: true

}

