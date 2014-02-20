/*
 * client/js/index.js
 */

'use strict';

// Load dependencies.
require('angular.translate');
require('angular.ui');
require('angular.ui.utils');
require('angular.ui.select2');
require('angular.ui.sortable');
require('angular.storage');
require('bootstrap');
require('jquery.center');
require('jquery.spin');
require('restangular');
require('angular.xeditable');

// Register modules.
require('./account');
require('./admin');
require('./auth');
require('./layout');
require('./main');
require('./shared');
require('./render');

// Register app.
require('./app');
