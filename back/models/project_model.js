const mongoose = require("mongoose")
const schema = mongoose.Schema;

const projectSchema = new schema(
    {
        creatorId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            minLength: 1,
            maxLength: 200
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

module.exports = mongoose.model("project", projectSchema)