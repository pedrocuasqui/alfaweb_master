/*jshint esversion:8 */
/**
 * forbidden.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.forbidden();
 *     // -or-
 *     return res.forbidden(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'forbidden'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function forbidden(message) {
	// Get access to `req` and `res`
	var req = this.req;
	var res = this.res;
	/* 
    //DEFINO LA RUTA DE LA VISTA QUE SE VA A A MOSTRAR
    var viewFilePath = '403';
    // Define the status code to send in the response.
    var statusCodeToSet = 403;
  
    // If no data was provided, use res.sendStatus().
    if (optionalData === undefined) {
      sails.log.info('Ran custom response: res.forbidden()');
      return res.sendStatus(statusCodeToSet);
    }
    // Else if the provided data is an Error instance, if it has
    // a toJSON() function, then always run it and use it as the
    // response body to send.  Otherwise, send down its `.stack`,
    // except in production use res.sendStatus().
    else if (_.isError(optionalData)) {
      sails.log.info('Custom response `res.forbidden()` called with an Error:', optionalData);
  
      // If the error doesn't have a custom .toJSON(), use its `stack` instead--
      // otherwise res.json() would turn it into an empty dictionary.
      // (If this is production, don't send a response body at all.)
      if (!_.isFunction(optionalData.toJSON)) {
        if (process.env.NODE_ENV === 'production') {
          return res.sendStatus(statusCodeToSet);
        }
        else {
          return res.status(statusCodeToSet).send(optionalData.stack);
        }
      }
    }
    // Set status code and send response data.
    else {
      return res.status(statusCodeToSet).send(optionalData);
    }
  
  };
   */

	var viewFilePath = "403";
	var statusCode = 403;

	var result = {
		status: statusCode
	};

	// Optional message
	if (message) {
		result.message = message;
	}

	// If the user-agent wants a JSON response, send json
	if (req.wantsJSON) {
		return res.json(result, result.status);
	}

	// Set status code and view locals
	res.status(result.status);
	for (var key in result) {
		res.locals[key] = result[key];
	}
	// And render view
	res.render(viewFilePath, result, function(err) {
		// If the view doesn't exist, or an error occured, send json
		if (err) {
			return res.json(result, result.status);
		}

		// Otherwise, serve the `views/mySpecialView.*` page
		res.render(viewFilePath);
	});
};
