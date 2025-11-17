/* eslint-env jest */
// Importa o supertest para testar rotas HTTP
const request = require("supertest");
// Importa o express para criar a aplicação de teste
const express = require("express");
// Importa as rotas de pessoa
const personRoutes = require("./personRoutes");
// Importa o modelo Person para mockar métodos do banco
const Person = require("../models/Person");

// Cria a aplicação Express de teste
const app = express();
app.use(express.json());
app.use("/person", personRoutes);

// Bloco de testes para a API de pessoa
describe("Person API", () => {
  // Mocka Person.find antes de todos os testes
  beforeAll(() => {
    jest.spyOn(Person, "find").mockResolvedValue([]);
  });

  // Restaura todos os mocks após os testes
  afterAll(() => {
    jest.restoreAllMocks();
  });

  // Testa GET /person retorna 200
  it("GET /person deve retornar 200", async () => {
    const res = await request(app).get("/person");
    expect(res.statusCode).toBe(200);
  });

  // Testa POST /person sem nome retorna 422
  it("POST /person sem nome deve retornar 422", async () => {
    const res = await request(app)
      .post("/person")
      .send({ salary: 5000, approved: true });
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty("error");
  });

  // Testa POST /person com corpo vazio retorna 422
  it("POST /person com corpo vazio deve retornar 422", async () => {
    const res = await request(app)
      .post("/person")
      .send({});
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty("error");
  });

  // Testa GET /person/:id retorna 422 se não encontrado
  it("GET /person/:id deve retornar 422 se não encontrado", async () => {
    jest.spyOn(Person, "findOne").mockResolvedValue(null);
    const res = await request(app).get("/person/123");
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty("message");
    jest.restoreAllMocks();
  });

  // Testa PATCH /person/:id retorna 422 se não encontrado
  it("PATCH /person/:id deve retornar 422 se não encontrado", async () => {
    jest.spyOn(Person, "updateOne").mockResolvedValue({ matchedCount: 0 });
    const res = await request(app)
      .patch("/person/123")
      .send({ name: "Teste", salary: 1000, approved: true });
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty("message");
    jest.restoreAllMocks();
  });

  // Testa DELETE /person/:id retorna 422 se não encontrado
  it("DELETE /person/:id deve retornar 422 se não encontrado", async () => {
    jest.spyOn(Person, "findOne").mockResolvedValue(null);
    const res = await request(app).delete("/person/123");
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty("message");
    jest.restoreAllMocks();
  });

  // Testa GET /person/:id retorna 200 se encontrado
  it("GET /person/:id deve retornar 200 se encontrado", async () => {
    jest.spyOn(Person, "findOne").mockResolvedValue({ _id: "123", name: "João", salary: 5000, approved: true });
    const res = await request(app).get("/person/123");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "João");
    jest.restoreAllMocks();
  });

  // Testa PATCH /person/:id retorna 200 se atualizado
  it("PATCH /person/:id deve retornar 200 se atualizado", async () => {
    jest.spyOn(Person, "updateOne").mockResolvedValue({ matchedCount: 1 });
    const res = await request(app)
      .patch("/person/123")
      .send({ name: "João", salary: 6000, approved: false });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "João");
    jest.restoreAllMocks();
  });

  // Testa DELETE /person/:id retorna 200 se removido
  it("DELETE /person/:id deve retornar 200 se removido", async () => {
    jest.spyOn(Person, "findOne").mockResolvedValue({ _id: "123", name: "João" });
    jest.spyOn(Person, "deleteOne").mockResolvedValue({ deletedCount: 1 });
    const res = await request(app).delete("/person/123");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    jest.restoreAllMocks();
  });

  // Testa POST /person retorna 500 em caso de erro
  it("POST /person deve retornar 500 em caso de erro", async () => {
    jest.spyOn(Person, "create").mockRejectedValue(new Error("DB error"));
    const res = await request(app)
      .post("/person")
      .send({ name: "João", salary: 5000, approved: true });
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("error");
    jest.restoreAllMocks();
  });

  // Testa GET /person retorna 500 em caso de erro
  it("GET /person deve retornar 500 em caso de erro", async () => {
    jest.spyOn(Person, "find").mockRejectedValue(new Error("DB error"));
    const res = await request(app).get("/person");
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("error");
    jest.restoreAllMocks();
  });

  // Testa GET /person/:id retorna 500 em caso de erro
  it("GET /person/:id deve retornar 500 em caso de erro", async () => {
    jest.spyOn(Person, "findOne").mockRejectedValue(new Error("DB error"));
    const res = await request(app).get("/person/123");
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("error");
    jest.restoreAllMocks();
  });

  // Testa PATCH /person/:id retorna 500 em caso de erro
  it("PATCH /person/:id deve retornar 500 em caso de erro", async () => {
    jest.spyOn(Person, "updateOne").mockRejectedValue(new Error("DB error"));
    const res = await request(app)
      .patch("/person/123")
      .send({ name: "João", salary: 6000, approved: false });
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("error");
    jest.restoreAllMocks();
  });

  // Testa DELETE /person/:id retorna 500 em caso de erro
  it("DELETE /person/:id deve retornar 500 em caso de erro", async () => {
    jest.spyOn(Person, "findOne").mockResolvedValue({ _id: "123", name: "João" });
    jest.spyOn(Person, "deleteOne").mockRejectedValue(new Error("DB error"));
    const res = await request(app).delete("/person/123");
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("error");
    jest.restoreAllMocks();
  });
});
