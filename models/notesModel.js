const mongoose= require("mongoose")
const Schema = mongoose.Schema;

const notesSchema= new Schema({
    title: {
        type: String,
        required: true,
    },
    content:{
        type : String,
        required : true,
        unique : true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})

module.exports= mongoose.mongoose.model("Notes", notesSchema)