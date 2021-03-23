const { Schema, model } = require('mongoose');

const imageSchema = new Schema(
    {
        img: { 
            data: Buffer, 
            contentType: String
        }
    }, 
    {
        timestamps: true
    }
)

const Image = model('Image', imageSchema)

module.exports = Image