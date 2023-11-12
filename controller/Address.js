const Address = require("../database/Address");

const getAllAddressOfaUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const addresses = await Address.find({ userId });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSpecificAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.addressId);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addNewAddress = async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(
      req.params.addressId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.addressId);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.status(201).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports={getAllAddressOfaUser,getSpecificAddress,addNewAddress,updateAddress,deleteAddress}