const express = require('express');
require('dotenv').config();

// Crear el servidor de express

const app = express();


// Directorio publico 
app.use( express.static('public'));


//Rutas
/* app.get('/', (req, resp) => {
    
    resp.json({
        ok: true
    })
}); */


//Escuchar peticiones

app.listen( process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${ process.env.PORT }`);
})