/// <reference = cypress >

describe("Testes da criação, `registo e login", () => {
    it("Teste de criação de usuário com sucesso", () => {
        cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('.btn-link').click()
        cy.get('#firstName').type('Victor')
        cy.get('#Text1').type('Boaventura')
        cy.get('#username').type('bsmvictor')
        cy.get('#password').type('1234')
        cy.get('.btn-primary').click()
        cy.get('.ng-binding').should('contain', 'Registration successful')
    })

    it("Teste de criação de usuário com falha", () => {
        cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('.btn-link').click()
        cy.get('#firstName').type('Victor')
        cy.get('#Text1').type('Boaventura')
        cy.get('#username').type('bsmvictor')
        cy.get('.btn-primary').should('be.disabled')
    })

    it("Teste de login com sucesso", () => {
        let data = CriarUsuario()
        cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('#username').type(data[0])
        cy.get('#password').type(data[1])
        cy.get('.btn-primary').click()
        cy.get('h1.ng-binding').should('contain.text', data[0])
    })

    it("Teste de deletar usuário e login falhar", () => {
        let data = CriarUsuario()
        cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('#username').type(data[0])
        cy.get('#password').type(data[1])
        cy.get('.btn-primary').click()
        cy.get('.ng-binding > a').click()
        cy.get('.btn').click()
        cy.get('#username').type(data[0])
        cy.get('#password').type(data[1])
        cy.get('.btn-primary').click()
        cy.get('.ng-binding').should('contain', 'Username or password is incorrect')
    })
})

function CriarUsuario() {
    let hora = new Date().getHours().toString()
    let minuto = new Date().getMinutes().toString()
    let segundo = new Date().getSeconds().toString()
    let ID = hora + minuto + segundo + "ID"
    let Senha = hora + minuto + segundo + "Senha"
    let data = [ID, Senha]

    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type(ID)
    cy.get('#Text1').type(ID)
    cy.get('#username').type(ID)
    cy.get('#password').type(Senha)
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain', 'Registration successful')
    return data
}