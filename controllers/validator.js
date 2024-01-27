'use strict';

const { body, validationResult } = require('express-validator');

function showErrorMessageIfAvailable(page = '', context = {}) {
    return function (req, res, next) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors = errors.array();

            let message = '';
            for (let i = 0; i < errors.length; i++) {
                message += errors[i].msg + "<br/>";
            }

            if (page == '')
                return res.send(message);
            return res.render(`${res.locals.nodejsPath}/${page}`, { error: message, ...context });
        }

        next();
    }
}

module.exports = { body, showErrorMessageIfAvailable }