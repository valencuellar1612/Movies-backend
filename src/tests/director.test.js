const request = require('supertest');
const app = require('../app');
let id;

test("GET/directors debe traer todos los directores", async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST/directors debe crear un director", async() => {
    const newActor = {
        firstName: "Alfonso",
        lastName: "Cuaron",
        nationality: "EU",
        image:"imagen.com",
        birthday:"1967-10-28"
    }
    const res= await request(app).post('/directors').send(newActor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newActor.name);
});

test("PUT/directors/:id debe actualizar un director", async() => {
    const actor = {
        firstName: "Alfonso Actualizado"
    }
    const res= await request(app).put(`/directors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actor.name);
});

test("DELETE/directors/:id", async()=> {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});