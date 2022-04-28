// write tests here
describe('Quotes App',()=>{
    beforeEach(() =>{
        //runs before every test in the testing suite
        //start each test with fresh state
        cy.visit('http://localhost:1234')
    })
    //Getters, pointing to elements within the DOM
 const textInput = () => cy.get('input[name=text]')
 const authorInput = () => cy.get('input[name = author]')
 const foobarInput = () => cy.get('input[name = foobar]')
 const submitBtn = () => cy.get('button[id=submitBtn]')
 const cancelBtn = () => cy.get('button[id=cancelBtn]')

    it('Sanity check', ()=>{
        //is test
        //expect is an assertion
        //can be multiple assertions per test
        //each assertion should test 1 thing
        expect(1+2).to.equal(3) //true
        expect(2+2).not.to.equal(5)// true
        expect({}).not.to.equal({}) //true, objects take different memory slots and hence are not the same even if key:values are same
    })
 
 
    it('the proper elements are showing',()=>{
        textInput().should('exist')
        foobarInput().should('not.exist')
        authorInput().should('exist')
        submitBtn().should('exist')
        cancelBtn().should('exist')

        cy.contains('Submit Quote').should('exist')
        cy.contains(/submit quote/i).should('exist') //i means case insensitve

    })
 
 
    describe('filling out inputs and canceling',()=>{
        it('can navigate to site',()=>{
            cy.url().should('include','localhost')
        })
        it('submit button is disabled',()=>{
            submitBtn().should("be.disabled")
        })
        it('can type in input',()=>{
            textInput()
            .should("have.value",'')
            .type('something')
            .should('have.value', 'something')
            authorInput()
            .should("have.value",'')
            .type('things')
            .should('have.value', 'things')
        })
        it('the submit button enables when inputs are filled',()=>{
            textInput().type('something')
            authorInput().type('things')
            submitBtn().should('be.enabled')
        })
        it('cancel button can reset inputs and disable submit button',()=>{
            textInput().type('something')
            authorInput().type('things')
            cancelBtn().click()
            textInput().should('have.value', '')
            authorInput().should('have.value', '')
            submitBtn().should('be.disabled')
        })
    })
 
 
 
    describe('adding a new quote',()=>{
        it('Can submit and delete a new quote',()=>{
            textInput().type('something22')
            authorInput().type('things22')
            submitBtn().click()

            cy.contains('something22').siblings('button:nth-of-type(2)').click()
            cy.contains('something22').should('not.exist')
        })
        it('can submit a new quote',()=>{
            textInput().type('something25')
            authorInput().type('things25')
            submitBtn().click()
            cy.contains('something25').should('exist')
            cy.contains('something25').next().next().click() //similar to siblings, nth-type but goes to next element in this case the 2nd button
            cy.contains('something25').should('not.exist')
        })
    })
 
 
 
 
 
 
 
 
 
 
 
  
})