const express = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {

    // Populate separa todos los datos del user en un objeto aparte
    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    });
}

const createEvent = async(req, res = response ) => {

    const event = new Event(req.body);

    try {
        
        event.user = req.uid;
        const eventSaved = await event.save();

        res.json({
            ok: true,
            eventSaved
        });

    } catch ( error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: ' Speak with the administrator'
        });
    }
    
}

const updateEvent = async(req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            res.status(404).json({
                ok: false,
                msg:'Evento no existe por ese id'
            })
        }

        // Verificar que el usuario que quiere actualizar solo actualice su evento
        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        //Si es su evento podrá editar
        const newEvent = {
            ...req.body,
            user: uid 
        }

        // Update event

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent);

        res.json({
            ok: true,
            event: eventUpdated
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Speak with the admin'
        })
    }
}

const deleteEvent = (req, res = response ) => {
    res.json({
        ok: true,
        msg: 'deleted event'
    });
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent 
}