import pytest
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.webdriver import WebDriver

URL_PATH = "http://localhost:3000/en/onboarding"
PASSWORD = "JanesTest$Passowrd+clerk_test"

@pytest.fixture()
def driver():
    driver = webdriver.Chrome()
    driver.implicitly_wait(20)
    driver.get(URL_PATH)
    # yield instance
    yield driver
    # Close instance
    driver.quit()


class TestOnboarding:

    def sign_in_user(self, driver: WebDriver, email: str, password: str):
        # Navigate to Sign In
        driver.find_element(By.XPATH, "/html/body/div/div[2]/div[2]/p").click()
        continueBtn = driver.find_element(By.CLASS_NAME, "cl-formButtonPrimary")

        # Enter Email & continue
        driver.find_element(By.ID, "identifier-field").send_keys(email)
        continueBtn.click()
        sleep(2)

        # Enter Password & continue
        driver.find_element(By.ID, "password-field").send_keys(password)
        driver.find_element(By.CLASS_NAME, "cl-formButtonPrimary").click()
        sleep(2)

        driver.get(URL_PATH)

    def form_values_inject(self, driver: WebDriver, name: str, surname: str, company: str, phone: str):
        # Assign
        self.namefield = driver.find_element(By.ID, "firstName")
        self.surnamefield = driver.find_element(By.ID, "lastName")
        self.emailfield = driver.find_element(By.ID, "email")
        self.company = driver.find_element(By.ID, "company")
        self.phonefield = driver.find_element(By.ID, "phoneNumber")
        self.submitbtn = driver.find_element(By.ID, "submitForm")

        # Scroll to form
        action = webdriver.ActionChains(driver)
        action.move_to_element(self.submitbtn).perform()

        # Act
        self.namefield.send_keys(name)
        self.surnamefield.send_keys(surname)
        self.phonefield.send_keys(phone)
        self.company.send_keys(company)

    @pytest.mark.parametrize("email, password", [
        ("jane+clerk_test@example.com", "JanesTest$Passowrd+clerk_test")
    ])
    def test_user_signin(self, driver, email, password):
        # ASSIGN
        self.sign_in_user(driver, email, password)
        sleep(2)

        # ASSERT
        assert driver.find_element(By.ID, "OnboardingCard").is_displayed()
        assert driver.find_element(By.ID, "email").get_attribute("value") == email

    @pytest.mark.parametrize("name, surname, email, company, phone, assertphone ", [
        ("John", "Doe", "jane+clerk_test@example.com", "HaciendaXTest", "656853805", "+27 65 685 3805")
    ])
    def test_form_values_capture(self, driver, name, surname, email, company, phone, assertphone):
        # Arrange
        self.sign_in_user(driver, email, PASSWORD)
        self.form_values_inject(driver, name, surname, company, phone)

        # Assert
        assert self.namefield.get_attribute("value") == name
        assert self.surnamefield.get_attribute("value") == surname
        assert self.emailfield.get_attribute("value") == email
        assert self.company.get_attribute("value") == company
        assert self.phonefield.get_attribute("value") == assertphone
        assert self.submitbtn.is_displayed()

        print("\nTest Form Values are Captured - OK")

    @pytest.mark.parametrize("name, surname, email, company, phone, assertphone ", [
        ("John", "Doe", "jane+clerk_test@example.com", "HaciendaXTest", "656853805", "+27 65 685 3805")
    ])
    def test_form_submits(self, driver, name, surname, email, company, phone, assertphone):
        # Assign
        self.sign_in_user(driver, email, PASSWORD)
        self.form_values_inject(driver, name, surname, company, phone)

        # Act
        self.submitbtn.click()

        # Assert
        assert driver.find_element(By.ID, "formLoader").is_displayed()  # Assert form loader
        print("\nForm Content shows Loading State - OK")

        assert driver.find_element(By.ID, "SuccessCard").is_displayed()
        print("\nForm Content shows Success State  - OK")

        assert driver.find_element(By.XPATH, "/html/section/ol/li").is_displayed()  # Assert success message
        print("\nForm Content shows Success State (Toast) - OK")
