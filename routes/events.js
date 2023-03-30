// CRUD Calendar - Events, /api/events


const { Router } = require("express");
const router = Router();
const { validateJWT } = require('../middlewares/validate-jwt')
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");

//Todas deben pasar por la validación del JWT
// Get events
router.get('/',validateJWT, getEvents);

// Create new event
router.post('/',validateJWT, createEvent);

// Updated event
router.put('/:id',validateJWT, updateEvent);

// Updated event
router.delete('/:id', validateJWT, deleteEvent);

module.exports = router;