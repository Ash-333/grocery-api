const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
