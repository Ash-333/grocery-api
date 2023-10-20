const mongoose=require('mongoose')

const ImageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: mongoose.Schema.Types.Buffer, required: true },
  });
  
  const Images=mongoose.model("Image",ImageSchema)
  module.exports=Images