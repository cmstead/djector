'use strict';

const approvalsLocation = './test/approvals';
const approvalsConfigFactory = require('approvals-config-factory');
const approvalsConfig = approvalsConfigFactory.buildApprovalsConfig({
    reporter: 'kdiff3',
    errorOnStaleApprovedFiles: false
});

module.exports = require('approvals')
    .configure(approvalsConfig)
    .mocha(approvalsLocation);
