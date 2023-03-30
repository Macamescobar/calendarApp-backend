
const express = require('express');

const getEvents = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'get events'
    });
}

const createEvent = (req, res = response ) => {
    res.json({
        ok: true,
        msg: 'create event'
    });
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