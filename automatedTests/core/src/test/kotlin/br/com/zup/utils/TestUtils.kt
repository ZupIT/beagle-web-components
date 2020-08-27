package br.com.zup.utils

import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions
import java.util.concurrent.TimeUnit

object TestUtils {

    fun createDriver(url: String): WebDriver {
        val driverKey = UtilResources.getProperties("nameDriver")
        println("TESTE!!!!!!!!")
        if (System.getProperty(driverKey)?.isEmpty() != false) {
            System.setProperty(
                    driverKey,
                    UtilResources.getProperties("pathDriver") +
                            UtilResources.getProperties("exeDriver"))
        } else {
            println(System.getProperty(driverKey))
        }

        val options = ChromeOptions()
        options.addArguments(
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--headless"
        )
        val driver = ChromeDriver(options)
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get(url)
        return driver
    }

}