const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
  },
  arrival: {
    type: Date,
  }
});

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Delta', 'Southwest', 'United']
  },
  airport: {
    type: String,
    enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date, 
    default: function() {
      var oneYearFromNow = new Date();
      return oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    }
  },
  destinations: [destinationSchema],
  available: [{type: Schema.Types.ObjectId, ref: "Ticket"}],
  nowFlying: Boolean
});

module.exports = mongoose.model('Flight', flightSchema);

function deleteOne(id) {
  const idx = flights.findIndex(flight => flight.id === parseInt(id));
  flights.splice(idx, 1);
}