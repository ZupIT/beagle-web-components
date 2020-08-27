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

class TabViewScreenSteps {

    lateinit var driver: WebDriver
    lateinit var screenFactory: ScreenFactory

    @Before("@tabview")
    fun setup() {
        driver = TestUtils.createDriver("http://localhost:3000/?path=tabview")
        //TODO get platform from run param
        screenFactory = ScreenFactory(platform = ScreenFactory.Platform.react, driver = driver)
    }


    @Given("^that I'm on the tabview screen$")
    fun checkTabViewScreen() {
        var tabViewScreen = screenFactory.getTabViewScreen()

        Assert.assertTrue(tabViewScreen.tab1Text?.isDisplayed ?: false)

    }

    @Then("^my tabview components should render their respective tabs attributes correctly$")
    fun checkTabViewRendersTabs() {
        var tabViewScreen = screenFactory.getTabViewScreen()

        Assert.assertTrue(tabViewScreen.tab1Text?.text.equals("Tab 1"))
        Assert.assertTrue(tabViewScreen.tab1Text2?.text.equals("Welcome to Tab 1"))
        Assert.assertTrue(tabViewScreen.tab1Text3?.text.equals("This is Tab1's second text"))


        tabViewScreen.tab2Text?.click()
        Assert.assertTrue(tabViewScreen.tab2Text?.text.equals("Tab 2"))
        Assert.assertTrue(tabViewScreen.tab2Text2?.text.equals("Welcome to Tab 2"))
        Assert.assertTrue(tabViewScreen.tab2Text3?.text.equals("This is Tab2's second text"))


        tabViewScreen.tab3Text?.click()
        Assert.assertTrue(tabViewScreen.tab3Text?.text.equals("Tab 3"))
        Assert.assertTrue(tabViewScreen.tab3Text2?.text.equals("Welcome to Tab 3"))
        Assert.assertTrue(tabViewScreen.tab3Text3?.text.equals("This is Tab3's second text"))


        tabViewScreen.tab4Text?.click()
        Assert.assertTrue(tabViewScreen.tab4Text?.text.equals("Tab 4"))
        Assert.assertTrue(tabViewScreen.tab4Text2?.text.equals("Welcome to Tab 4"))
        Assert.assertTrue(tabViewScreen.tab4Text3?.text.equals("This is Tab4's second text"))
    }

    @After("@tabview")
    fun driverClose() {
        driver.close()
    }
}


