import { EmployeeHandler } from "./pageObjects/EmployeeHandler";

const em = new EmployeeHandler();

describe("Employee Manager", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  afterAll(async () => {
    await em.quit();
  });
  it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "test person",
      phone: "1234567890",
      title: "test result",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("test person");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    expect(employee.phone).toEqual("1234567890");
    expect(employee.title).toEqual("test result");
  });
  it("can edit an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.saveChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "Grand Poobah",
    });
  });
describe("Challenge 3", () => {
  it("1. Add one more Employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "Tony Stark",
      phone: "1010101010",
      title: "Iron Man",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("Tony Stark");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("Tony Stark");
    expect(employee.phone).toEqual("1010101010");
    expect(employee.title).toEqual("Iron Man");
  });
  it("2. Cancelling an Edit", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Toilet Scrubber" });
    await em.cancelChanges();
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "CEO",
    });
  });
    it("3.) Editing and then navigating away without saving does not save changes", async () => {
      await em.selectEmployeeByName("Bernice Ortiz");
      await em.editEmployee({ title: "President of USA" });
      await em.selectEmployeeByName("Phillip Weaver");
      await em.selectEmployeeByName("Bernice Ortiz");
      let employee = await em.getEmployeeInfo();
      expect(employee).toEqual({
        id: 1,
        name: "Bernice Ortiz",
        phone: "4824931093",
        title: "CEO",
      });
    });
  });
});