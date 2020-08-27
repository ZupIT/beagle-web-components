@button @regression
Feature: Button Component Validation

  As a Beagle developer/user
  I'd like to make sure my button component works as expected
  In order to guarantee that my application never fails

  Background:
    Given that I'm on the button screen

  Scenario: Button 01 - Button component renders text attribute correctly
    Then all my button components should render their respective text attributes correctly

  Scenario: Button 02 - Button component renders action attribute correctly
    When I click on button
    Then component should render the action attribute correctly


# Snapshot Test
#    Scenario: Button 02 - Button component renders style attribute correctly
#        When I click on a component with a valid style attribute configured
#        Then component should render the style attribute correctly