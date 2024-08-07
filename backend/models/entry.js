const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2}\/\d{2}\/\d{4}$/.test(v)
      },
      message: (props) => `${props.value} is not a valid date format!`,
    },
  },
  content: {
    type: String,
    required: true,
  },
})

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Entry', entrySchema)
