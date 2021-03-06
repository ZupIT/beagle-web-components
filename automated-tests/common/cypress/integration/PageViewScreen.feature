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

# @pageview @regression
# Feature: PageView Component Validation

#     As a Beagle developer/user
#     I'd like to make sure my pageView component works as expected
#     In order to guarantee that my application never fails

#     Background:
#         Given that I'm on the pageview screen

#     Scenario: PageView 01 - PageView component renders text attribute correctly
#         Then my pageview components should render their respective pages attributes correctly


@pageview @regression
Feature: PageView Component Validation

    As a Beagle developer/user
    I'd like to make sure my pageView component works as expected
    In order to guarantee that my application never fails

    Background:
        Given that I'm on the pageview screen

    Scenario: PageView 01 - Check that the child components of the current page view appear on the screen and that they have been configured correctly
        Then checks that the text Page 1 is on the screen
        When I click on Right arrow 
        Then checks that the text Page 2 is on the screen
        When I click on Right arrow 
        Then checks that the text Page 3 is on the screen

    Scenario: PageView 02 - Checking if pageview arrow indicator components appear on the screen
        Then checks that the component is on the screen
        
    Scenario Outline: PageView 03 - Checking that the onPageChange triggers a list of actions when the page changes
        When I click on Button with <text> title
        Then checks that the text Page 3 is on the screen
     
    Examples:
      |text                      |
      |Click to go to page three |

    Scenario: PageView 04 - Checks the context set on PageView
       Then checks if the context pageViewContext existing on the screen