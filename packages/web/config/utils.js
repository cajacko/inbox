const get = require('lodash/get');
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const copy = require('../src/lib/config/marketingCopy.json');
const errors = require('../src/lib/config/errors.json');

/**
 * Escape those pesty characters
 */
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Get an error and format it for the html template
 */
const getErrorForHtml = (code, tag) => {
  const error = errors[code];

  if (!error) throw new Error(`Could not get the html error at: ${code}`);

  return {
    [`${tag}_TITLE`]: escapeHtml(get(copy, error.title)),
    [`${tag}_MESSAGE`]: escapeHtml(get(copy, error.message)),
    [`${tag}_CODE`]: escapeHtml(code),
  };
};

/**
 * Get the vars to inject into the html
 */
const getHtmlVars = () => {
  const vars = {
    CODE_TEXT: escapeHtml(copy.ErrorBoundary.ErrorCode),
    ...getErrorForHtml('100-004', 'ERROR'),
    ...getErrorForHtml('100-005', 'NO_JS'),
    ...getErrorForHtml('100-006', 'JS_NETWORK_ERROR'),
    ERROR_EMAIL: escapeHtml(copy.General.ContactEmail),
    TITLE: escapeHtml(copy.General.Title),
  };

  Object.keys(vars).forEach((key) => {
    const value = vars[key];

    if (value === undefined) {
      throw new Error(`Undefined value found in webpack config for: ${key}`);
    }
  });

  return vars;
};

exports.escapeHtml = escapeHtml;
exports.getErrorForHtml = getErrorForHtml;
exports.getHtmlVars = getHtmlVars;
