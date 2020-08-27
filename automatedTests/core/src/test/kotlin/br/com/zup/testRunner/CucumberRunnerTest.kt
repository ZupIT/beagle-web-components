package br.com.zup.testRunner

import io.cucumber.junit.Cucumber
import io.cucumber.junit.CucumberOptions
import org.junit.Test
import org.junit.runner.RunWith


@RunWith(Cucumber::class)
@CucumberOptions(
        features = ["src/test/resources/features"],
        glue = ["br.com.zup.steps"])

class CucumberRunnerTest {

}