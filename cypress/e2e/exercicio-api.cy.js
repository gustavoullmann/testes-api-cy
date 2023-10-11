/// <reference types="cypress" />
import usuariosSchema from "../contracts/usuario.contrac";
const { faker } = require("@faker-js/faker");

describe("Testes da Funcionalidade Usuários", () => {
  it("Deve validar contrato de usuários", () => {
    cy.request("usuarios").then((response) => {
      return usuariosSchema.validateAsync(response.body);
    });
  });

  it("Deve listar usuários cadastrados", () => {
    let fakerEmail = faker.internet.email();
    cy.cadastrarUsuario("Teste Usuario2", fakerEmail, "testeSenha", "true");
    cy.request("usuarios").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.quantidade).to.be.greaterThan(0);
    });
  });

  it.only("Deve cadastrar um usuário com sucesso", () => {
    let fakerEmail = faker.internet.email();
    cy.cadastrarUsuario("Novo Usuário", fakerEmail, "testeSenha", "false").then(
      (response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal(
          "Cadastro realizado com sucesso"
        );
      });
  });

  it("Deve validar um usuário com email inválido", () => {
    //TODO:
  });

  it("Deve editar um usuário previamente cadastrado", () => {
    //TODO:
  });

  it("Deve deletar um usuário previamente cadastrado", () => {
    //TODO:
  });
});
