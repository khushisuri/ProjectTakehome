const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
  form_name: {
    type: String,
    required: true,
  },
  form_data: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);
module.exports = Form;