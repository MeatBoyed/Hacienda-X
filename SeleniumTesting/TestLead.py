import os
from time import sleep

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.webdriver import WebDriver


# DATABASE_URL: str = os.environ.get("SUPABASE_URL")
# DATABASE_KEY: str = os.environ.get("SUPABASE_KEY")

@pytest.fixture()
def driver():
    driver = webdriver.Chrome()
    driver.implicitly_wait(20)
    driver.get("http://localhost:3000/en/property-for-sale/Manchester%20Home")
    # yield instance
    yield driver
    # Close instance
    driver.quit()


class TestLead:
    # Assign form fields and insert values
    """
    Injects form values into the specified fields and submits the form.

    Args:
        driver (WebDriver): The WebDriver instance used to interact with the web page.
        name (str): The name value to be injected into the name field.
        surname (str): The surname value to be injected into the surname field.
        email (str): The email value to be injected into the email field.
        phone (str): The phone value to be injected into the phone field.
        message (str): The message value to be injected into the message field.

    Returns:
        None
    """

    def form_values_inject(self, driver: WebDriver, name: str, surname: str, email: str, phone: str, message: str):
        """
        Injects form values into the specified fields and submits the form.

        Args:
            driver (WebDriver): The WebDriver instance used to interact with the web page.
            name (str): The name value to be injected into the name field.
            surname (str): The surname value to be injected into the surname field.
            email (str): The email value to be injected into the email field.
            phone (str): The phone value to be injected into the phone field.
            message (str): The message value to be injected into the message field.

        Returns:
            None
        """
        # Assign
        self.namefield = driver.find_element(By.ID, "name")
        self.surnamefield = driver.find_element(By.ID, "surname")
        self.emailfield = driver.find_element(By.ID, "email")
        self.phonefield = driver.find_element(By.ID, "phoneNumber")
        self.messagefield = driver.find_element(By.ID, "message")
        self.submitbtn = driver.find_element(By.ID, "submitLead")

        # Scroll to form
        action = webdriver.ActionChains(driver)
        action.move_to_element(self.submitbtn).perform()

        # Act
        self.namefield.send_keys(name)
        self.surnamefield.send_keys(surname)
        self.emailfield.send_keys(email)
        self.phonefield.send_keys(phone)
        self.messagefield.send_keys(message)

    """
    Tests the form values capture functionality.

    This test case injects form values into the specified fields and verifies that the values are correctly captured.

    Parameters:
        driver (WebDriver): The WebDriver instance used to interact with the web page.
        name (str): The name value to be injected into the name field.
        surname (str): The surname value to be injected into the surname field.
        email (str): The email value to be injected into the email field.
        phone (str): The phone value to be injected into the phone field.
        assertphone (str): The expected phone value to be captured.
        message (str): The message value to be injected into the message field.

    Returns:
        None
    """

    @pytest.mark.parametrize("name, surname, email, phone, assertphone, message", [
        ("John", "Doe", "nZ2u4@example.com", "656853805", "+27 65 685 3805", "Hello World")
    ])
    def test_form_values_capture(self, driver, name, surname, email, phone, assertphone, message):
        # Assign and Act
        self.form_values_inject(driver, name, surname, email, phone, message)

        # Assert
        assert self.namefield.get_attribute("value") == name
        assert self.surnamefield.get_attribute("value") == surname
        assert self.emailfield.get_attribute("value") == email
        assert self.phonefield.get_attribute("value") == assertphone
        assert self.messagefield.get_attribute(
            "value") == "I'm interested in this property, please contact me." + message
        assert self.submitbtn.is_displayed()

        print("\nTest Form Values are Captured - OK")



    """
    Tests the form submission functionality.

    This test case injects form values into the specified fields, submits the form, and verifies that the form is
    submitted successfully.

    Parameters:
        driver (WebDriver): The WebDriver instance used to interact with the web page.
        name (str): The name value to be injected into the name field.
        surname (str): The surname value to be injected into the surname field.
        email (str): The email value to be injected into the email field.
        phone (str): The phone value to be injected into the phone field.
        assertphone (str): The expected phone value to be captured.
        message (str): The message value to be injected into the message field.

    Returns:
        None
    """

    @pytest.mark.parametrize("name, surname, email, phone, assertphone, message", [
        ("John", "Doe", "nZ2u4@example.com", "656853805", "+27 65 685 3805", "Hello World")
    ])
    def test_form_submits(self, driver, name, surname, email, phone, assertphone, message):
        # Assign
        self.form_values_inject(driver, name, surname, email, phone, message)

        # Act
        self.submitbtn.click()

        # Assert
        assert driver.find_element(By.ID, "formLoader").is_displayed()  # Assert form loader
        print("\nTest Form Content shows Loading State - OK")
        assert driver.find_element(By.XPATH, "/html/section/ol/li").is_displayed()  # Assert success message
        print("Test Form Content shows Success State (Toast) - OK")

    # @pytest.mark.usefixtures("database")
    # def test_DB_captured_values(self, database):
    #     pass
    # lead = database.table("Leads").select("name", "surname", "email", "phone", "message").eq("John", "Doe",
    #                                                                                          "nZ2u4@example.com",
    #                                                                                          "656853805",
    #                                                                                          "I'm interested in this property, please contact me.Hello World").execute()
    # print("Database Lead: ", lead)
