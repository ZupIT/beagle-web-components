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

class ListViewScreenSteps {

    lateinit var driver: WebDriver
    lateinit var screenFactory: ScreenFactory

    @Before("@listview")
    fun setup() {
        driver = TestUtils.createDriver("http://localhost:3000/?path=listview")
        //TODO get platform from run param
        screenFactory = ScreenFactory(platform = ScreenFactory.Platform.react, driver = driver)
    }


    @Given("^that I'm on the listview screen$")
    fun checkListViewScreen() {
        var listViewScreen = screenFactory.getListViewScreen()

        Assert.assertTrue(listViewScreen.listViewStaticVerticalText?.isDisplayed ?: false)
    }

    @Then("^I have a vertical list configured$")
    fun checkVerticalListText() {
        var listViewScreen = screenFactory.getListViewScreen()

        Assert.assertTrue(listViewScreen.listViewStaticVerticalText?.text.equals("Static VERTICAL ListView"))
        Assert.assertTrue(listViewScreen.listViewDynamicVerticalText?.text.equals("Dynamic VERTICAL ListView"))
    }

    @When("^I have a horizontal list configured$")
    fun checkHorizontalListText() {
        var listViewScreen = screenFactory.getListViewScreen()

        Assert.assertTrue(listViewScreen.listViewStaticHorizontalText?.text.equals("Static HORIZONTAL ListView"))
        Assert.assertTrue(listViewScreen.listViewDynamicHorizontalText?.text.equals("Dynamic HORIZONTAL ListView"))
    }

    @Then("^listview screen should render all text attributes correctly$")
    fun checkListViewScreenTexts() {
        var listViewScreen = screenFactory.getListViewScreen()

        Assert.assertTrue(listViewScreen.listViewStaticVerticalText?.text.equals("Static VERTICAL ListView"))
        Assert.assertTrue(listViewScreen.listViewStaticHorizontalText?.text.equals("Static HORIZONTAL ListView"))
        Assert.assertTrue(listViewScreen.listViewDynamicVerticalText?.text.equals("Dynamic VERTICAL ListView"))
        Assert.assertTrue(listViewScreen.listViewDynamicHorizontalText?.text.equals("Dynamic HORIZONTAL ListView"))
    }


    @After("@listview")
    fun driverClose() {
        driver.close()
    }
}

