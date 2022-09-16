const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const schema = mongoose.Schema;

const projectSchema = new schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 60,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            maxLength: 500,
            minlength: 16
        },
        picture: {
            type: String,
            default: "./uploads/projects/random-user.png"
        },
    },
    {
        timestamps: true,
    }

)

module.exports = mongoose.model("user", projectSchema)