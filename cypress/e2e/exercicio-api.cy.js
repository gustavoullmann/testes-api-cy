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

  it("Deve cadastrar um usuário com sucesso", () => {
    let fakerEmail = faker.internet.email();
    cy.cadastrarUsuario("Novo Usuário", fakerEmail, "testeSenha", "false").then(
      (response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal(
          "Cadastro realizado com sucesso"
        );
      }
    );
  });

  it("Deve validar um usuário com email inválido", () => {
    cy.cadastrarUsuario(
      "Usuário Email Inválido",
      "emailinvalido.com",
      "testeSenha",
      "false"
    ).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.email).to.equal("email deve ser um email válido");
    });
  });

  it("Deve editar um usuário previamente cadastrado", () => {
    let fakerEmail = faker.internet.email();
    let novoUsuarioId;

    cy.cadastrarUsuario(
      "Editar Usuário",
      fakerEmail,
      "testeSenha",
      "true"
    ).then((response) => {
      expect(response.status).to.equal(201);
      novoUsuarioId = response.body._id;

      cy.request({
        method: "PUT",
        url: `usuarios/${novoUsuarioId}`,
        body: {
          nome: "Nome Editado",
          email: fakerEmail,
          password: "senhaEditada",
          administrador: "false",
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Registro alterado com sucesso");
      });
    });
  });

  it.only("Deve deletar um usuário previamente cadastrado", () => {
    let fakerEmail = faker.internet.email();
    let novoUsuarioId;

    cy.cadastrarUsuario(
      "Excluir Usuário",
      fakerEmail,
      "testeSenha",
      "true"
    ).then((response) => {
      expect(response.status).to.equal(201);
      novoUsuarioId = response.body._id;

      cy.request({
        method: "DELETE",
        url: `usuarios/${novoUsuarioId}`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Registro excluído com sucesso");
      });
    });
  });
});
