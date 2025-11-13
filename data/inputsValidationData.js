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

export const rulesByLayout = {
  login: {
    email: /^[\w\_\-\.]+@[\w\-\.]+\.[a-zA-Z]{2,6}$/,
    password: /^(?=.*\p{N})(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[^a-zA-Z0-9])(?!.*\s).{8,72}$/u,
  },
  user: {
    name: /^[\p{L}](?:[\p{L}\p{M}\s'-]{0,58}[\p{L}])?$/u,
    firstname: /^[\p{L}](?:[\p{L}\p{M}\s'-]{0,58}[\p{L}])?$/u,
    username: /^[\p{L}\p{N}].{1,16}$/u,
    email: /^[\w\_\-\.]+@[\w\-\.]+\.[a-zA-Z]{2,6}$/,
    password: /^(?=.*\p{N})(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[^a-zA-Z0-9])(?!.*\s).{8,72}$/u,
  },
  reservation: {
    idReservation: /^[0-9a-fA-F]{24}$/,
    clientName: /^[\p{L}](?:[\p{L}\p{M}\s'-]{0,58}[\p{L}])?$/u,
    boatName: /^[\p{L}\p{N}](?:[\p{L}\p{M}\p{N}\s'-]{0,58}[\p{L}\p{N}])$/u,
  },
  catway: {
    number: /^\p{N}{1,3}$/u,
    type: /^(long|short)$/,
    state: /^\p{L}(?:[\p{L}\p{M}\p{N}\s':;,"()-.!]{0,200}[\p{L}.!])$/u,
  },
};

export const requiredFields = {
  login: ['email', 'password'],
  user: ['username', 'email', 'password'],
  reservation: ['clientName', 'boatName', 'startDate', 'endDate'],
  catway: ['number', 'type', 'state'],
};
export const usableFields = {
  user: ['name', 'firstname', 'username', 'email', 'password'],
  catway: ['state'],
  reservation: ['idReservation', 'startDate', 'endDate']
}
