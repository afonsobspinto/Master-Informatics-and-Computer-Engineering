/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import { } from 'jasmine';


describe('Starting tests for mogplay', function () {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be mogplay', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result) => {
      expect(result).toBe('Mogplay');
    })
  });

  it('website title should be not found', () => {
    page.navigateTo('/not-found');
    return browser.getTitle().then((result) => {
      expect(result).toBe('MogPlay - Page Not Found');
    })
  });

  it('network-name should be mogplay@0.0.1', () => {
    element(by.css('.network-name')).getWebElement()
      .then((webElement) => {
        return webElement.getText();
      })
      .then((txt) => {
        expect(txt).toBe('mogplay@0.0.1.bna');
      });
  });

  it('navbar-brand should be mogplay', () => {
    element(by.css('.navbar-brand')).getWebElement()
      .then((webElement) => {
        return webElement.getText();
      })
      .then((txt) => {
        expect(txt).toBe('mogplay');
      });
  });


  it('Video component should be loadable', () => {
    page.navigateTo('/Video');
    browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Video');
      });
  });

  it('Video table should have 3 columns', () => {
    page.navigateTo('/Video');
    element.all(by.css('.thead-cols th')).then(function (arr) {
      expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
    });
  });



  it('User component should be loadable', () => {
    page.navigateTo('/User');
    browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('User');
      });
  });

  it('User table should have 2 columns', () => {
    page.navigateTo('/User');
    element.all(by.css('.thead-cols th')).then(function (arr) {
      expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
    });
  });



  it('Purchase component should be loadable', () => {
    page.navigateTo('/Purchase');
    browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Purchase');
      });
  });


});
