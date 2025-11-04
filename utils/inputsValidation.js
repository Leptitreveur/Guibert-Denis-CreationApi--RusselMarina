import { sequentialPatterns, rulesByLayout, requiredFields } from '../data/inputsValidationData.js';

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

function containsRequiredFields(bodydata, layout) {
  return (req, res, next) => {
    const required = requiredFields[layout] || [];
    const missing = required.filter((key) => !(key in bodydata));

    if (missing.length > 0) {
      return res.status(400).json({
        message: 'Missing required fields.',
        data: { required, missing },
      });
    }
    return next();
  };
}

function respectRules(bodydata, layout) {
  return (req, res, next) => {
    const rules = rulesByLayout[layout] || {};
    for (const [dataKey, dataValue] of Object.entries(bodydata)) {
      for (const [rulesKey, rulesValue] of Object.entries(rules)) {
        if (dataKey === rulesKey) {
          if (!rulesValue.test(dataValue)) {
            if (typeof dataValue !== 'string') {
              return res.status(400).json({ message: `Field : '${dataKey}' must be a string.` });
            };
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

function containsSequentialPatterns(candidate) {
  return (req, res, next) => {
    if (typeof candidate !== 'string') {
      return next();
    }
    const allSequentialPatterns = flattenSequentialPatterns();
    const containsPatterns = allSequentialPatterns.some((patterns) => candidate.includes(patterns));

    if (containsPatterns) {
      return res.status(400).json({
        message: 'Password should not contain simple keyboard sequence.',
      });
    }
    return next();
  };
}
//==========================================================================================================================================

function inputsValidation(layout) {
  return (req, res, next) => {
    if (!layout || !rulesByLayout || !requiredFields) {
      return res.status(500).json({
        message: `Validation's layout missing or invalid.`,
      });
    }
    const { bodydata } = req.body;
    const candidate = bodydata.password;

    const required = containsRequiredFields(bodydata, layout);
    const rules = respectRules(bodydata, layout);
    const patterns = containsSequentialPatterns(candidate);

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