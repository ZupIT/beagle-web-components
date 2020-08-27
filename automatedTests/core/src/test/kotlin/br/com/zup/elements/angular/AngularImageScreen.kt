package br.com.zup.elements.angular

import br.com.zup.elements.ImageScreen
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.FindBy
import org.openqa.selenium.support.PageFactory

class AngularImageScreen(private val driver: WebDriver): ImageScreen {

    override val imageText1: WebElement?
        get() = TODO("Not yet implemented")
    override val imageText2: WebElement?
        get() = TODO("Not yet implemented")
    override val imageText3: WebElement?
        get() = TODO("Not yet implemented")
    override val imageText4: WebElement?
        get() = TODO("Not yet implemented")
    override val imageText5: WebElement?
        get() = TODO("Not yet implemented")

    init {
        PageFactory.initElements(driver, this)
    }
}