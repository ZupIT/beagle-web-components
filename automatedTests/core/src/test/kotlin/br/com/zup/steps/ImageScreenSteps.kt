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

class ImageScreenSteps {

    lateinit var driver: WebDriver
    lateinit var screenFactory: ScreenFactory

    @Before("@image")
    fun setup() {
        driver = TestUtils.createDriver("http://localhost:3000/?path=image")
        //TODO get platform from run param
        screenFactory = ScreenFactory(platform = ScreenFactory.Platform.react, driver = driver)
    }


    @Given("^that I'm on the image screen$")
    fun checkImageScreen() {
        var imageScreen = screenFactory.getImageScreen()

        Assert.assertTrue(imageScreen.imageText1?.isDisplayed ?: false)
    }

    @Then("^image screen should render all text attributes correctly$")
    fun checkImageScreenTexts() {
        var imageScreen = screenFactory.getImageScreen()

        Assert.assertTrue(imageScreen.imageText1?.text.equals("Image"))
        Assert.assertTrue(imageScreen.imageText2?.text.equals("Image with contentMode = FIT_XY"))
        Assert.assertTrue(imageScreen.imageText3?.text.equals("Image with contentMode = FIT_CENTER"))
        Assert.assertTrue(imageScreen.imageText4?.text.equals("Image with contentMode = CENTER_CROP"))
        Assert.assertTrue(imageScreen.imageText5?.text.equals("Image with contentMode = CENTER"))
    }

    @After("@image")
    fun driverClose() {
        driver.close()
    }
}