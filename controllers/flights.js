const Flight = require('../models/flight');
const Ticket = require('../models/ticket');


module.exports = {
  index,
  show,
  new: newFlight,
  create,
  delete: deleteFlight
};

function deleteFlight(req, res){
  Flight.findByIdAndDelete(req.params.id).then(function(){
    console.log('flight deleted');
    res.redirect('/flights')
  });
}

function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', { title: 'All Flights', flights });
  });
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('available').exec(function(err, flight) {
    // Performer.find({}).where('_id').nin(movie.cast) <-- Mongoose query builder
    // Native MongoDB approach 
    Ticket.find(
     {_id: {$nin: flight.available}},
     function(err, tickets) {
       console.log(tickets);
       res.render('flights/show', {
         title: 'Flight Detail', flight, tickets
       });
     }
   );
  });
}
  
function newFlight(req, res) {
  res.render('flights/new', { title: 'Add Flight' });
}

  function create(req, res){
    req.body.nowFlying = !!req.body.nowFlying;
    let dt = new Flight().departs;
    if(!req.body.departs){
        req.body.departs = dt;
    }
    const flight = new Flight(req.body);
    flight.save(function(err){
        if(err) return res.render("flights/new");
        res.redirect(`/flights`);
    });
  }
  