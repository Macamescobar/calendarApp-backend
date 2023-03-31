const express = require('express');
const Event = require('../models/Event');

const getEvents = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'get events'
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

const updateEvent = (req, res = response ) => {
    res.json({
        ok: true,
        msg: 'updated event'
    });
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