import { sequentialPatterns, rulesByLayout, requiredFields, usableFields } from '../data/inputsValidationData.js';

/**
 * Flatten sequential patterns function
 *
 * Convert the sequential patterns object into an array ready to use.
 *
 * @returns {Array<string>} Array of sequential patterns
 * @see ../data/inputsValidationData.js For complete documentation
 */
function flattenSequentialPatterns() {
  const patterns = [];
  for (const level1 of Object.values(sequentialPatterns)) {
    for (const level2 of Object.values(level1)) {
      for (const level3 of Object.values(level2)) {
        for (const level4 of Object.values(level3)) {
          patterns.push(level4);
        }
      }
    }
  }
  return patterns;
}

/**
 * Check required fields presence function
 *
 * Returns a middleware that checks the request body data to verify the presence
 * of required or allowed fields regarding the layout and service being used.
 *
 * @param {Object} bodydata - Requested body data (keys)
 * @param {string} layout - Selected layout passed on by inputsValidation middleware (required, must be 'users', 'reservations', 'catways' , 'login')
 * @param {string} service - Selected service passed on by inputsValidation middleware (required, must be 'add', 'update', 'login')
 * @returns {Function} Express middleware function that validates required/allowed fields
 * @throws {400} Empty request
 * @throws {400} Unauthorized field(s) in the request
 * @throws {400} Missing required fields
 * @see ../data/inputsValidationData.js For complete documentation
 */
function containsRequiredFields(bodydata, layout, service) {
  return (req, res, next) => {
    const bodyKeys = Object.keys(bodydata);
    const required = requiredFields[layout] || [];
    const allowed = usableFields[layout] || [];

    if (bodyKeys.length === 0) {
      return res.status(400).json({
        message: 'Empty request.',
      });
    }

    if (service === 'add' || service === 'login') {
      const unauthorizedRequiredFields = bodyKeys.filter((key) => !required.includes(key));
      if (unauthorizedRequiredFields.length > 0) {
        return res.status(400).json({
          message: 'Unauthorized field(s) in the request',
          data: { required, unauthorizedRequiredFields },
        });
      }

      const missing = required.filter((key) => !bodyKeys.includes(key));
      if (missing.length > 0) {
        return res.status(400).json({
          message: 'Missing required fields.',
          data: { required, missing },
        });
      }
    }

    if (service === 'update') {
      const unauthorizedAllowedFields = bodyKeys.filter((key) => !allowed.includes(key));
      if (unauthorizedAllowedFields.length > 0) {
        return res.status(400).json({
          message: 'Unauthorized field(s) in the request',
          data: { allowed, unauthorizedAllowedFields },
        });
      }
    }

    return next();
  };
}

/**
 * Check rules application function
 *
 * Returns a middleware function that checks that the request body data respect regex rules
 * regarding the layout being used.
 *
 * @param {Object} bodydata - Requested body data (required)
 * @param {string} layout - Selected layout passed on by inputsValidation middleware (required, must be 'users', 'reservations', 'catways' , 'login')
 * @returns {Function} Express middleware function that validates field rules
 * @throws {400} Field must be a string
 * @throws {400} Rules not respected
 * @see ../data/inputsValidationData.js For complete documentation
 */
function respectRules(bodydata, layout) {
  return (req, res, next) => {
    const rules = rulesByLayout[layout] || {};
    for (const [dataKey, dataValue] of Object.entries(bodydata)) {
      for (const [rulesKey, rulesValue] of Object.entries(rules)) {
        if (dataKey === rulesKey) {
          if (!rulesValue.test(dataValue)) {
            if (typeof dataValue !== 'string') {
              return res.status(400).json({ message: `Field : '${dataKey}' must be a string.` });
            }
            return res.status(400).json({
              message: `Rules not respected.`,
              data: { dataKey, dataValue },
            });
          }
        }
      }
    }
    return next();
  };
}
/**
 * Check sequential patterns presence function
 *
 * Returns a middleware function that checks that the password does not contain any sequential patterns
 * from flattenSequentialPatterns array regarding layout and service being used.
 *
 * @param {string} candidate - Password passed on by inputsValidation middleware for validation (required)
 * @param {string} layout - Selected layout passed on by inputsValidation middleware (required, must be 'users', 'reservations', 'catways' , 'login')
 * @param {string} service - Selected service passed on by inputsValidation middleware (required, must be 'add', 'update', 'login')
 * @returns {Function} Express middleware function that validates password are sequential patterns free
 * @throws {400} Password contains sequential patterns
 * @see ../data/inputsValidationData.js For complete documentation
 */
function containsSequentialPatterns(candidate, layout, service) {
  return (req, res, next) => {
    if (layout === 'users' && (service === 'add' || service === 'update')) {
      if (typeof candidate !== 'string') {
        return next();
      }

      const allSequentialPatterns = flattenSequentialPatterns();
      const containsPatterns = allSequentialPatterns.some((patterns) => candidate.includes(patterns));

      if (containsPatterns) {
        return res.status(400).json({
          message: 'Password contains sequential patterns.',
        });
      }
      return next();
    }
    return next();
  };
}
/**
 * Inputs validation middleware
 *
 * Returns a middleware function that applies all the validation process functions
 * to users's inputs (in the request body) regarding the layout (sub-route) and service being used.
 * Verifies the presence of layout parameter (and its type), rulesByLayout and
 * requiredFields before starting the validation process.
 *
 * @param {string} layout - Selected sub-route being used (required, must be 'users', 'reservations', 'catways', 'login')
 * @param {string} service - Selected service being used (required, must be 'add', 'update', 'login')
 * @returns {Function} Express middleware function that validates request body inputs
 * @throws {500} Validation's layout missing or invalid
 * @throws {500} Service layout must be a string and have one of those values: add, update, login
 * @see ../data/inputsValidationData.js For complete documentation
 */
function inputsValidation(layout, service) {
  return (req, res, next) => {
    if (!layout || !rulesByLayout || !requiredFields) {
      return res.status(500).json({
        message: `Validation's layout missing or invalid.`,
      });
    }

    const serviceType = typeof service;
    const allowedservices = ['add', 'update', 'login'];

    if (serviceType !== 'string' || !allowedservices.includes(service)) {
      return res.status(500).json({
        message: 'Service layout must be a string and have one of those values: add, update, login.',
        data: { serviceType, service, allowedservices },
      });
    }

    const bodydata = req.body;
    const candidate = bodydata.password;

    const required = containsRequiredFields(bodydata, layout, service);
    const rules = respectRules(bodydata, layout);
    const patterns = containsSequentialPatterns(candidate, layout, service);

    return required(req, res, (err) => {
      if (err) return;
      rules(req, res, (err) => {
        if (err) return;
        patterns(req, res, (err) => {
          if (err) return;
          return next();
        });
      });
    });
  };
}

export default inputsValidation;
