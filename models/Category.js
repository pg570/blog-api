const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        name :{type : String, required: true },  
    },
    {
    timestamps : true
})

const CategoryModel = mongoose.model("category", CategorySchema)

module.exports = CategoryModel