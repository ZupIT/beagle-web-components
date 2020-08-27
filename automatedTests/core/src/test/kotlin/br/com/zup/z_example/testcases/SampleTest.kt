package br.com.zup.z_example.testcases

import br.com.zup.utils.TestUtils
import br.com.zup.utils.UtilResources
import br.com.zup.z_example.webpages.HomePage
import br.com.zup.z_example.webpages.ResultPage
import org.junit.After
import org.junit.Assert
import org.junit.Before
import org.junit.Test
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions
import java.util.concurrent.TimeUnit

class SampleTest() {

    lateinit var driver: WebDriver
        private set

    @Before
    fun setup() {
        driver = TestUtils.createDriver("https://www.youtube.com")
    }

    @Test
    fun searchVideo() {

        val homePage = HomePage(driver!!)
        homePage.searchVideo(UtilResources.getProperties("nameVideo"))

//        val resultPage = ResultPage(driver!!)
//        Assert.assertTrue(resultPage.isPageOpened())
//
//        resultPage.selectVideo(UtilResources.getProperties("selectVideo"))
//
//        Assert.assertTrue(resultPage.playingVideo(UtilResources.getProperties("selectVideo"),
//                UtilResources.getProperties("channel")))
    }

    @After
    fun driverClose() {
        driver.close();
    }

}