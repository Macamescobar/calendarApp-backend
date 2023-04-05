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
            return res.status(404).json({
                ok: false,
                msg:'Evento no existe por ese id'
            })
        }

        // Verificar que el usuario que quiere actualizar solo actualice su evento
        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "You can't edit this event"
            })
        }

        //Si es su evento podrá editar
        const newEvent = {
            ...req.body,
            user: uid 
        }

        // Update event

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

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

const deleteEvent = async(req, res = response ) => {
    
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg:'Evento no existe por ese id'
            })
        }

        // Verificar que el usuario que quiere actualizar solo actualice su evento
        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "You can't delete this event"
            })
        }

        await Event.findByIdAndDelete( eventId );
       
        res.json({ ok: true });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Speak with the admin'
        });
    }


}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent 
}