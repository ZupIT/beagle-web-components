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

class PageViewScreenSteps {

    lateinit var driver: WebDriver
    lateinit var screenFactory: ScreenFactory

    @Before("@pageview")
    fun setup() {
        driver = TestUtils.createDriver("http://localhost:3000/?path=pageview")
        //TODO get platform from run param
        screenFactory = ScreenFactory(platform = ScreenFactory.Platform.react, driver = driver)
    }


    @Given("^that I'm on the pageview screen$")
    fun checkTabViewScreen() {
        var pageViewScreen = screenFactory.getPageViewScreen()

        Assert.assertTrue(pageViewScreen.page1Text?.isDisplayed ?: false)
    }

    @Then("^my pageview components should render their respective pages attributes correctly$")
    fun checkTabViewRendersTabs() {
        var pageViewScreen = screenFactory.getPageViewScreen()

        Assert.assertTrue(pageViewScreen.page1Text?.text.equals("Page 1"))
        pageViewScreen.pageIndicator?.click()
        Assert.assertTrue(pageViewScreen.page2Text?.text.equals("Page 2"))
        pageViewScreen.pageIndicator?.click()
        Assert.assertTrue(pageViewScreen.page3Text?.text.equals("Page 3"))
    }

    @After("@pageview")
    fun driverClose() {
        driver.close()
    }
}