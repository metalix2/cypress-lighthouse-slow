/**
 * @license Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

// It is possible to override the default .lighthouserc.js config, so you can support multiple configs. 
// set Cypress.env('configPath', '.lighthouserc-mobile.js'); in your spec file to be run before the test suite.
module.exports = {
  ci: {
    collect: {
      // useful for when running more than one test. this will persist
      // previous reports so old tests aren't overwritten
      additive: true,
      numberOfRuns: 5,
      requiredSuccessfulRuns: 3,
      startServerCommand: false,
      // url: 'http://localhost:5000',
      headful: true,
      settings: {
        disableStorageReset: true,
        pauseAfterLoadMs: 1000,
        pauseAfterNetworkQuietMs: 1000,
      },
    },
    assert: {
      // May look into using presets later for better web health but
      // for moment primary focus is on web core vitals.
      // preset: 'lighthouse:recommended',
      assertions: {
        // Error on overall performance score
        'categories:performance': ['error', { minScore: 0.88 }],
        // warn on other performance scores
        'cumulative-layout-shift': ['warn', { minScore: 0.77 }],
        'first-contentful-paint': ['warn', { minScore: 0.65 }],
        interactive: ['warn', { minScore: 0.95 }],
        'largest-contentful-paint': ['warn', { minScore: 0.95 }],
        'speed-index': ['warn', { minScore: 0.95 }],
        'total-blocking-time': ['warn', { minScore: 0.95 }],
      },
      includePassedAssertions: true,
    }
  },
};
