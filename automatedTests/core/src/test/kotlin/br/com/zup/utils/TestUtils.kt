package br.com.zup.utils

import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions
import java.lang.Exception
import java.util.concurrent.TimeUnit

object TestUtils {

    val options = ChromeOptions().apply {
        addArguments(
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--headless"
        )
    }

    private fun isDriverSet(): Boolean {
        try {
            ChromeDriver(options)
            return true
        } catch (exception: Exception) {}
        return false
    }

    fun createDriver(url: String): WebDriver {
        val driverKey = UtilResources.getProperties("nameDriver")
        println("TESTE!!!!!!!!")
        if (!isDriverSet()) {
            println("NOT SET")
            System.setProperty(
                    driverKey,
                    UtilResources.getProperties("pathDriver") +
                            UtilResources.getProperties("exeDriver"))
        } else {
            println("SET")
        }

        val driver = ChromeDriver(options)
        driver.manage()?.timeouts()?.implicitlyWait(10, TimeUnit.SECONDS)
        driver.manage()?.window()?.maximize()
        driver.get(url)
        return driver
    }

}