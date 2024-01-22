const request = require('supertest');
const app = require('../app');
let id;
test("GET/ actors dee traer todas los actores", async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST/ actors debe crear un actor", async() => {
    const newActor = {
        firstName: "Ryan",
        lastName: "Reinols",
        nationality: "EU",
        image:"imagen.com",
        birthday:"1967-10-28"
    }
    const res= await request(app).post('/actors').send(newActor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newActor.name);
});

test("PUT/actors/:Id debe actualizar un actor", async() => {
    const actor = {
        firstName: "Ryan Actualizado"
    }
    const res= await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actor.name);
});

test("DELETE/actors/:id", async()=> {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});