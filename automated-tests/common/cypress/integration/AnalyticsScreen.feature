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
    I'd like to make sure my Analytics works as expected
    In order to guarantee that my application never fails

    Background:
        Given the Beagle application did launch with the Analytics screen url

    Scenario: Analytics 01 - Action with no remote analytics config and declared in the local config (should not create record)
        When I press the button with title "Alert with no specific analytics configuration"
        Then an alert dialog should appear on the screen
        When I press the dialog's OK button
        Then no analytics record should be created
    
    Scenario: Analytics 02 - Action with no remote analytics config and declared in the local config (should create record with params in config)
        When I press the button with title "Confirm with no specific analytics configuration"
        Then a confirm dialog should appear on the screen
        When I press the dialog's OK button
        Then an analytics record should be created with { type: "action", ... }
        
    Scenario: Analytics 03 - Action with remote analytics config and not declared in the local config (should create record with params from remote config)
        When I press the button with title "Alert with specific analytics configuration"
        Then an alert dialog should appear on the screen
        When I press the dialog's OK button
        Then an analytics record should be created with { type: "action", ... }
    
    Scenario: Analytics 04 - Action with analytics disabled with the remote config (should not create record)
        When I press the button with title "Confirm with specific analytics configuration"
        Then a confirm dialog should appear on the screen
        When I press the dialog's OK button
        Then no analytics record should be created
    
    Scenario: Analytics 05 - View loaded, secreen analytics enabled in the config (should create record)
        Then an analytics record should be created with { type: 'secreen', platform: 'web-angular', url: 'my-url' }
        
    Scenario: Analytics 06 - View loaded, secreen analytics disabled in the config (should not create record)
        Given that, in the anaylics config, enableScreenAnalytics is false
        When I press the button with title navigateToPage2
        Then no analytics record should be created

