

describe("Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  })

  it('should have working number buttons', () => {
    cy.get('#number2').click();
    cy.get('.display').should('contain', '2')
  })

  it('should update the display when a number is clicked', () => {
    cy.get('#number1').click();
    cy.get('#number2').click();
    cy.get('#number3').click();
    cy.get('.display').should('contain', '123')
    })

  it('should update the display after an arithmetical operation', () => {
    cy.get('#number5').click();
    cy.get('#operator-multiply').click();
    cy.get('#number7').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', '35')
  })

  it('should allow multiple arithmetical operations to be chained together', () => {
    cy.get('#number5').click();
    cy.get('#operator-multiply').click();
    cy.get('#number7').click();
    cy.get('#operator_add').click();
    cy.get('#number1').click();
    cy.get('#number0').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', '45');
  })

  it('should output positive numbers', () => {
    cy.get('#number1').click();
    cy.get('#operator_add').click();
    cy.get('#number1').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', '2');
  })

  it('should output decimals', () => {
    cy.get('#number1').click();
    cy.get('#decimal').click();
    cy.get('#number3').click();
    cy.get('#operator-multiply').click();
    cy.get('#number3').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', '3.9');

  })

  it('should output negative numbers', () => {
    cy.get('#number1').click();
    cy.get('#operator-subtract').click();
    cy.get('#number2').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', '-1');
  })

  it('should output zero', () => {
    cy.get('#number1').click();
    cy.get('#operator-subtract').click();
    cy.get('#number1').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', '0');
  })

  it('should output very large numbers', () => {
    
    let numberOfZeros = 15

    cy.get('#number1').click();
    for (let i = 0; i < numberOfZeros; i++){
      cy.get('#number0').click();
    }
    cy.get('#operator-multiply').click();

    cy.get('#number1').click();
    for (let i = 0; i < numberOfZeros; i++){
      cy.get('#number0').click();
    }

    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', '1e+30');

    
  })
    
  it('should output infinity if there is a division by zero', () => {
    cy.get('#number1').click();
    cy.get('#operator-divide').click();
    cy.get('#number0').click();
    cy.get('#operator-equals').click();
    cy.get('.display').should('contain', 'Infinity')
  })
})