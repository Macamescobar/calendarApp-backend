// CRUD Calendar - Events, /api/events

const { Router } = require("express");
const router = Router();
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { isDate } = require("../helpers/isDate");

//Todas las rutas deben pasar por la validación del JWT
router.use(validateJWT);

// Get events
router.get("/", getEvents);

// Create new event
router.post("/", 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        validateFields
    ], 
    createEvent
);

// Updated event
router.put("/:id", updateEvent);

// Updated event
router.delete("/:id", deleteEvent);

module.exports = router;
