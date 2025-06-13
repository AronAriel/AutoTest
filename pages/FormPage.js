const { faker } = require("@faker-js/faker");
const { BasePage } = require("./BasePage");

class FormPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  firstName = this.page.locator("#firstName");
  lastName = this.page.locator("#lastName");
  email = this.page.locator("#userEmail");
  genderMale = this.page.locator('label[for="gender-radio-1"]');
  mobile = this.page.locator("#userNumber");
  dobInput = this.page.locator("#dateOfBirthInput");
  dobDay15 = this.page.locator(
    ".react-datepicker__day--015:not(.react-datepicker__day--outside-month)"
  );
  subjectInput = this.page.locator("#subjectsInput");
  hobbiesCheckbox = this.page.locator('label[for="hobbies-checkbox-1"]');
  uploadPicture = this.page.locator("#uploadPicture");
  address = this.page.locator("#currentAddress");
  state = this.page.locator("#state");
  stateOption = this.page.locator('div[id^="react-select-3-option"]');
  city = this.page.locator("#city");
  cityOption = this.page.locator('div[id^="react-select-4-option"]');
  submitButton = this.page.locator("#submit");
  modalTitle = this.page.locator("#example-modal-sizes-title-lg");
  modal = this.page.locator(".modal-content");
  fakeName = "";
  fakeSurname = "";
  fakeEmail = "";
  fakeMobile = "";
  fakeAddress = "";

  async goto() {
    await this.open("https://demoqa.com/automation-practice-form");
  }

  async fillMandatoryFields() {
    this.fakeName = faker.person.firstName();
    this.fakeSurname = faker.person.lastName();
    this.fakeEmail = faker.internet.email();
    this.fakeMobile = faker.number
      .int({ min: 1000000000, max: 9999999999 })
      .toString();
    this.fakeAddress = faker.location.streetAddress();

    await this.firstName.fill(this.fakeName);
    await this.lastName.fill(this.fakeSurname);
    await this.email.fill(this.fakeEmail);
    await this.genderMale.click();
    await this.mobile.fill(this.fakeMobile);

    await this.dobInput.scrollIntoViewIfNeeded();
    await this.dobInput.click();
    await this.dobDay15.click();

    await this.address.fill(this.fakeAddress);

    await this.state.scrollIntoViewIfNeeded();
    await this.state.click();
    await this.stateOption.first().click();

    await this.city.scrollIntoViewIfNeeded();
    await this.city.click();
    await this.cityOption.first().click();
  }

  async submitForm() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click({ force: true });
  }

  async isSubmissionSuccessful() {
    return this.modalTitle.isVisible();
  }

  async getModalText() {
    return this.modal.textContent();
  }
}

module.exports = { FormPage };
