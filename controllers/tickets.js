const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  new: newTicket,
  create,
  addToAvailable,
  delete: deleteTicket
};

function deleteTicket(req, res){
  Ticket.findByIdAndDelete(req.params.id).then(function(){
    console.log('ticket deleted');
    res.redirect(`back`)
  });
}

function addToAvailable(req, res){
 Flight.findById(req.params.flightId, function(err, flight){
   flight.available.push(req.body.ticketId);

   flight.save(function(err){
     res.redirect(`/flights/${flight._id}`)
   })
 })

}

function create(req, res) {
    Ticket.create(req.body, function (err, ticket) {
        res.redirect('/tickets/new');
      });
  }

function newTicket(req, res) {
  Ticket.find({}, function (err, tickets) {
    res.render('tickets/new', {
      title: 'Create A Ticket',
      tickets
    });
  })
}