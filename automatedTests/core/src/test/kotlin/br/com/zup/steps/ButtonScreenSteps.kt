package br.com.zup.steps

import br.com.zup.elements.ScreenFactory
import br.com.zup.utils.TestUtils
import br.com.zup.utils.UtilResources
import io.cucumber.java.After
import io.cucumber.java.Before
import io.cucumber.java.en.*
import org.junit.Assert
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import java.util.concurrent.TimeUnit

class ButtonScreenSteps {

    lateinit var driver: WebDriver
    lateinit var screenFactory: ScreenFactory

    @Before("@button")
    fun setup() {
        driver = TestUtils.createDriver("http://localhost:3000/?path=button")
        //TODO get platform from run param
        screenFactory = ScreenFactory(platform = ScreenFactory.Platform.react, driver = driver)
    }


    @Given("that I'm on the button screen")
    fun checkButtonScreen() {
        var buttonScreen = screenFactory.getButtonScreen()

        Assert.assertTrue(buttonScreen.buttonDefault?.isDisplayed ?: false)
    }

    @When("I click on button")
    fun clickOnButton() {
        var buttonScreen = screenFactory.getButtonScreen()

        buttonScreen.buttonDefault?.click()
    }

    @Then("all my button components should render their respective text attributes correctly")
    fun renderTextAttributeCorrectly() {
        var buttonScreen = screenFactory.getButtonScreen()

        Assert.assertTrue(buttonScreen.buttonDefault?.text.equals("Button"))
        Assert.assertTrue(buttonScreen.buttonWithStyle?.text.equals("Button with style"))
        Assert.assertTrue(buttonScreen.buttonWithAppearance?.text.equals("Button with Appearance"))
        Assert.assertTrue(buttonScreen.buttonWithAppearanceAndStyle?.text.equals("Button with Appearance and style"))
    }

    @Then("component should render the action attribute correctly")
    fun renderActionAttributeCorrectly() {
        var buttonScreen = screenFactory.getButtonScreen()

        Assert.assertTrue(buttonScreen.actionClickText?.text.equals("You clicked right"))
    }

    @After("@button")
    fun driverClose() {
        driver.close()
    }

}