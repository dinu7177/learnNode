const mongoose = require("mongoose");

const MenuItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      taste: {
        type: String,
        enum: ['Sweet', 'Spicy', 'Sour'],
      },
      is_drink: {
        type: Boolean,
        default: false,
      },
      ingredients: {
        type: [String],
        default: [],
      },
      num_sales: {
        type: Number,
        default: 0,
      }    
},{ versionKey: false });

const MenuItem = mongoose.model("MenueItem", MenuItemsSchema, "MenueItems");

module.exports = MenuItem;