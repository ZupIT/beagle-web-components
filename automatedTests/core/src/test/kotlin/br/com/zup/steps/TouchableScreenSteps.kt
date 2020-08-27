package br.com.zup.steps

import br.com.zup.elements.ScreenFactory
import br.com.zup.utils.TestUtils
import br.com.zup.utils.UtilResources
import io.cucumber.java.After
import io.cucumber.java.Before
import io.cucumber.java.PendingException
import io.cucumber.java.en.*
import org.junit.Assert
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import java.util.concurrent.TimeUnit

class TouchableScreenSteps {

    lateinit var driver: WebDriver
    lateinit var screenFactory: ScreenFactory

    @Before("@touchable")
    fun setup() {
        driver = TestUtils.createDriver("http://localhost:3000/?path=touchable")
        //TODO get platform from run param
        screenFactory = ScreenFactory(platform = ScreenFactory.Platform.react, driver = driver)
    }


    @Given("^that I'm on the touchable screen$")
    fun checkImageScreen() {
        var touchableScreen = screenFactory.getTouchableScreen()

            Assert.assertTrue(touchableScreen.textWithTouchableText?.isDisplayed ?: false)
    }

    @And("^I have a text with touchable configured$")
    fun checkTextWithTouchable() {
        var touchableScreen = screenFactory.getTouchableScreen()
            Assert.assertTrue(touchableScreen.textWithTouchableText?.text.equals("Text with Touchable"))
    }

    @And("^I have an image with touchable configured$")
    fun checkImageWithTouchable() {
        var touchableScreen = screenFactory.getTouchableScreen()
        Assert.assertTrue(touchableScreen.imageWithTouchableText?.text.equals("Image with Touchable"))
    }

    @When("^I click on touchable text Click here!$")
    fun clickOnTouchableText() {
        var touchableScreen = screenFactory.getTouchableScreen()
        Assert.assertTrue(touchableScreen.clickHereTouchableText?.text.equals("Click here!"))
        touchableScreen.clickHereTouchableText?.click()
    }

    @Then("^touchable screen should render all text attributes correctly$")
    fun checkTouchableScreenTexts() {
        var touchableScreen = screenFactory.getTouchableScreen()

        Assert.assertTrue(touchableScreen.textWithTouchableText?.text.equals("Text with Touchable"))
        Assert.assertTrue(touchableScreen.clickHereTouchableText?.text.equals("Click here!"))
        Assert.assertTrue(touchableScreen.imageWithTouchableText?.text.equals("Image with Touchable"))
        Assert.assertTrue(touchableScreen.networkImageWithTouchableText?.text.equals("NetworkImage with Touchable"))
    }

    @Then("touchable component should render the action attribute correctly")
    fun renderActionAttributeCorrectly() {
        var touchableScreen = screenFactory.getTouchableScreen()

        Assert.assertTrue(touchableScreen.actionClickText?.text.equals("You clicked right"))
    }

    @After("@touchable")
    fun driverClose() {
        driver.close()
    }
}