const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js', {
    serverSelectionTimeoutMS: 5000
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(error => console.error('Error al conectar a MongoDB', error));

const superheroSchema = new mongoose.Schema({
    nombreSuperheroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: { type: String, default: 'Camila Valderrama' }
}, { collection: 'Grupo-01' });

const superHero = mongoose.model('superHero', superheroSchema);

async function insertSuperhero(){
    try {
        const hero = new superHero({
            nombreSuperheroe: 'Spiderman',
            nombreReal: 'Peter Parker',
            edad: 25,
            planetaOrigen: 'Tierra',
            debilidad: 'Radioactividad',
            poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza', 'Agilidad'],
            aliados: ['Ironman'],
            enemigos: ['Duende verde'],
            creador: 'Camila Valderrama'
        });

        await hero.save();
        console.log('Superheroe insertado');
    } catch (error) {
        console.error('Error al insertar superheroe', error);
    }
}

insertSuperhero();

async function updateSuperhero(nombreSuperheroe) {
    const result = await superHero.updateOne(
        { nombreSuperheroe: nombreSuperheroe },
        { $set:{ edad: 26 } }
    );

    console.log('Resultado de la actualización:', result);
    
}

//updateSuperhero('Spiderman');

async function deleteSuperhero(nombreSuperheroe) {
    const result = await superHero.deleteOne({ nombreSuperheroe: nombreSuperheroe });
    console.log('Superhéroe eliminado:', result);
    
}

//deleteSuperhero('Spiderman');

async function findSuperheroes() {
    const heroes = await superHero.find({ planetaOrigen: 'Tierra' });
    console.log('Supehéroes encontrados:', heroes);
    
}

//findSuperheroes();


