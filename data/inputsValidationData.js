/**
 * Keyboard sequential patterns
 * 
 * Contains common sequential patterns on azerty, qwerty and numpad keyboard.
 * 
 * @typedef {Object} sequentialPatterns
 * @property {Object} qwerty - QWERTY keyboard patterns
 * @property {Object} azerty - AZERTY keyboard patterns
 * @property {Object} numpad - NUMPAD keyboard patterns
 */
export const sequentialPatterns = {
  qwerty: {
    specialRow: {
      ascending: [`!@#`, `@#$`, `#$%`, `$%^`, `%^&`, `^&*`, `&*(`, `*()`, `()_`, `)_+`],
      descending: [`+_)`, `_)(`, `)(*`, `(*&`, `&^%`, `^%$`, `%$#`, `$#@`, `#@!`],
    },
    row1: {
      ascending: ['qwe', 'wer', 'ert', 'rty', 'tyu', 'yui', 'uio', 'iop'],
      descending: ['poi', 'oiu', 'iuy', 'uyt', 'ytr', 'tre', 'rew', 'ewq'],
    },
    row2: {
      ascending: ['asd', 'sdf', 'dfg', 'fgh', 'ghj', 'hjk', 'jkl'],
      descending: ['lkj', 'kjh', 'jhg', 'hgf', 'gfd', 'fds', 'dsa'],
    },
    row3: {
      ascending: ['zxc', 'xcv', 'cvb', 'vbn', 'bnm'],
      descending: ['mnb', 'nbv', 'bvc', 'vcb', 'cbx', 'bxz'],
    },
  },

  azerty: {
    specialRow: {
      ascending: [`&é"`, `é"'`, `"'(`, `'(-`, `(-è`, `-è_`, `è_ç`, `_çà`, `çà)`, `à)=`],
      descending: [`=)à`, `)àç`, `àç_`, `ç_è`, `_è-`, `è-(`, `-('`, `('"`, `'"é`, `"é&`],
    },
    row1: {
      ascending: ['aze', 'zer', 'ert', 'rty', 'tyu', 'yui', 'uio', 'iop'],
      descending: ['poi', 'oiu', 'iuy', 'uyt', 'ytr', 'tre', 'rez', 'eza'],
    },
    row2: {
      ascending: ['qsd', 'sdf', 'dfg', 'fgh', 'ghj', 'hjk', 'jkl', 'klm'],
      descending: ['mlk', 'lkj', 'kjh', 'jhg', 'hgf', 'gfd', 'fds', 'sdq'],
    },
    row3: {
      ascending: ['wxc', 'xcv', 'cvb', 'vbn'],
      descending: ['nbv', 'bvc', 'vcb', 'cbx'],
    },
  },
  numpad: {
    operator: {
      ascending: ['/*-', '*-+', '-+/'],
      descending: ['+-*', '-*/', '*/+'],
    },
    number: {
      ascending: ['012', '123', '234', '345', '456', '567', '678', '789', '890', '901'],
      descending: ['210', '109', '098', '987', '876', '765', '654', '543', '432', '321'],
    },
  },
};

/**
 * Regex rules by layout
 * 
 * Contains all regex input rules by layout (regex flag u = unicode).
 * 
 * @typedef {Object} rulesByLayout
 * @property {Array<string>} login - Validation rules for login (includes: email, password)
 * @property {Array<string>} users - Validation rules for users (includes: name, firstname, username, email, password)
 * @property {Array<string>} reservations - Validation rules for reservations (includes: idReservation, clientName, boatName) 
 * @property {Array<string>} catways - Validation rules for catways (includes: number, type, state)
 */
export const rulesByLayout = {
  login: {
    email: /^[\w\_\-\.]+@[\w\-\.]+\.[a-zA-Z]{2,6}$/,
    password: /^(?=.*\p{N})(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[^a-zA-Z0-9])(?!.*\s).{8,72}$/u,
  },
  users: {
    name: /^[\p{L}](?:[\p{L}\p{M}\s'-]{0,58}[\p{L}])?$/u,
    firstname: /^[\p{L}](?:[\p{L}\p{M}\s'-]{0,58}[\p{L}])?$/u,
    username: /^[\p{L}\p{N}].{1,16}$/u,
    email: /^[\w\_\-\.]+@[\w\-\.]+\.[a-zA-Z]{2,6}$/,
    password: /^(?=.*\p{N})(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[^a-zA-Z0-9])(?!.*\s).{8,72}$/u,
  },
  reservations: {
    idReservation: /^[0-9a-fA-F]{24}$/,
    clientName: /^[\p{L}](?:[\p{L}\p{M}\s'-]{0,58}[\p{L}])?$/u,
    boatName: /^[\p{L}\p{N}](?:[\p{L}\p{M}\p{N}\s'-]{0,58}[\p{L}\p{N}])$/u,
  },
  catways: {
    number: /^\p{N}{1,3}$/u,
    type: /^(long|short)$/,
    state: /^\p{L}(?:[\p{L}\p{M}\p{N}\s':;,"()-.!]{0,200}[\p{L}.!])$/u,
  },
};

/**
 * Required fields
 * 
 * Contains a list of required fields for the request to be valid when submitted.
 * 
 * @typedef {Object} requiredFields
 * @property {Array<string>} login - Required fields for login request
 * @property {Array<string>} users - Required fields for users request
 * @property {Array<string>} reservations - Required fields for reservations request
 * @property {Array<string>} catways - Required fields for catways request
 */
export const requiredFields = {
  login: ['email', 'password'],
  users: ['username', 'email', 'password'],
  reservations: ['clientName', 'boatName', 'startDate', 'endDate'],
  catways: ['number', 'type', 'state'],
};

/**
 * Usable fields on update
 * 
 * Contains usable fields for update operations that can be used in the request.
 * 
 * @typedef {Object} usableFields
 * @property {Array<string>} users - Users request - fields allowed for update operation
 * @property {Array<string>} catways - Catways request - fields allowed for update operation
 * @property {Array<string>} reservations - Reservations request - fields allowed for update operation
 */
export const usableFields = {
  users: ['name', 'firstname', 'username', 'email', 'password'],
  catways: ['state'],
  reservations: ['idReservation', 'startDate', 'endDate']
}
