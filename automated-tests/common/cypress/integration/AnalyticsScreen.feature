#
# Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

@action @Analytics @regression
Feature: Analytics validation
    As a Beagle developer/user
    I'd like to make sure my addChildren action works as expected
    In order to guarantee that my application never fails

    Background:
        Given the Beagle application did launch with the Analytics screen url

    Scenario Outline: Scenario Outline: Analytics 01 - The alert should display a message without analytics
        When I press an alert button with the <buttonTitle> title
        Then an alert with the <message> message should appear on the screen
        And I click on OK button
        Then the analytics shouldn't be called

        Examples:
            | buttonTitle               | message                   |
            | alertButtom               | AlertMessage              |
    
        Scenario Outline: Scenario Outline:Analytics 02 - Checks that a confirmation with just a message shows on the screen and should call the analytics
        When I press a confirm button with the <buttonTitle> title
        Then a confirm with the <message> message should appear on the screen
        And I click on OK button
        Then the analytics should be called

        Examples:
            | buttonTitle              | message                     |
            | confirmbuttom            | ConfirmMessage              |
    
        Scenario: Scenario 03 - Check if analytcs is loaded when the enable method is true
        When I loaded the page  
        Then the analytics should be initialized

        Scenario: Scenario 04 - Check if analytcs is not loaded when the enable method is false
        When I loaded the page 
        Then the analytics shouldn't be initialized


