import { Config } from 'protractor';

export let config: Config = {
    allScriptsTimeout: 11000,
    specs: [
        './e2e/**/*.e2e-spec.ts'
    ],
    capabilities: {
        chromeOptions: {
            args: ['--headless', '--disable-gpu']
        },
        'browserName': 'chrome'
    },
    baseUrl: 'http://localhost:4200/',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function () { }
    },
    onPrepare() {
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.e2e.json')
        });
    }
};
