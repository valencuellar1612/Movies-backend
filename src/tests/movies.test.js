const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let id;

test("GET /movies debe traer todas las movies", async() => {
  const res = await request(app).get('/movies');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debe crear una movie", async () => {
    const newMovie = {
      name: "Rocky",
      image: "image.com",
      synopsis: "...",
      releaseYear: 1976
    }
    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
    expect(res.body.id).toBeDefined();
  });

  test("PUT /movies/:id debe actualizar una movie", async () => {
    const genre = {
      name: "Rocky actualizado",
    }
    const res = await request(app).put(`/movies/${id}`).send(genre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genre.name);
  });

//TEST PARA LOS ENDPOINT CON SETEADO 
//se crea una pelicula de muestra y luego se elimina
test('POST/movies/:id/actors debe insertar los actores en la pelicula', async()=>{
    const actor = await Actor.create({
        firstName:"Leonardo",
        lastName:"DiCaprio",
        nationality:"EU",
        image:"image.com",
        birthday: "1974-11-11"
    });
    const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id])//se pones los ID de los actores que pertenecen a la pelicula 
    await actor.destroy();//se elimina inmediatamente la pelicula
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);// se compara que tenga la misma cantidad de artistas con lo que se espera (1) 
});

test('POST/movies/:id/directors debe insertar los actores en la pelicula', async()=>{
    const director = await Director.create({
        firstName: "Alfonso",
        lastName: "Cuaron",
        nationality: "EU",
        image:"imagen.com",
        birthday:"1967-10-28"
    });
    const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id])
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST/movies/:id/genres debe insertar los actores en la pelicula', async()=>{
    const genre = await Genre.create({
        name: "terror"
    });
    const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]) 
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1); 
});

test("DELETE /movies/:id debe eliminar una movie", async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
  });
  
  