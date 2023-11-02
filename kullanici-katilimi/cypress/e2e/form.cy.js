describe("CreateForm Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Loads the form", () => {
    cy.get("form").should("exist");
  });
  it("should have empty form fields on load", () => {
    cy.get('input[name="name"]').should("have.value", "");
    cy.get('input[name="surname"]').should("have.value", "");
    cy.get('input[name="email"]').should("have.value", "");
    cy.get('input[name="password"]').should("have.value", "");
    cy.get('input[name="checkbox"]').should("not.be.checked");
    cy.get('button[type="submit"]').should("exist");
  });

  it("displays validation errors for invalid inputs and not show success message", () => {
    cy.get('input[name="name"]').type("A");
    cy.get('input[name="surname"]').type("B");
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('input[name="password"]').type("123");
    cy.get('input[type="checkbox"]').uncheck();
    cy.get(".alert-success").should("not.exist");
  });
  it("submits the form", () => {
    cy.get("form").submit();
  });
  it("should successfully submit form data using POST request and display alert-success after submission", () => {
    cy.intercept("POST", "https://reqres.in/api/users").as("postUser");
    cy.get('input[name="name"]').type("John");
    cy.get('input[name="surname"]').type("Doe");
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.get('input[name="password"]').type("password");
    cy.get('input[name="checkbox"]').check();
    cy.get('button[type="submit"]').click();
    cy.wait("@postUser").its("response.statusCode").should("eq", 201);
    cy.get(".alert-success").should("contain", "Form successfully submitted!");
  });
  it("should successfully make a GET request to load users", () => {
    cy.intercept("GET", "https://reqres.in/api/users").as("getUsers");
    cy.wait("@getUsers").its("response.statusCode").should("eq", 200);
    cy.get("ol").find("li").should("have.length.greaterThan", 0);
  });
});
