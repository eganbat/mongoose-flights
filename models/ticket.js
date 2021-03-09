const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    seat: {
        type: String,
        match: /[A-F][1-9]\d?/
      },
      price: {
        type: Number,
        min: 0
      }
});

module.exports = mongoose.model('Ticket', ticketSchema);

// function deleteOne(id) {
//     const idx = tickets.findIndex(ticket => ticket.id === parseInt(id));
//     tickets.splice(idx, 1);
//   }