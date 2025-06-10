export type User = {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    postalCode?: string;
};

export const availableUsernames = {
    standard: <string>process.env.STANDARD_USERNAME,
    locked: 'locked_out_user',
    problem: <string>process.env.PROBLEM_USERNAME,
    performanceGlitch: <string>process.env.PERFORMANCE_GLITCH_USERNAME,
    error: 'error_user',
    visual: <string>process.env.VISUAL_USERNAME
} as const;

export const password = {
    valid: <string>process.env.PASSWORD,
    invalid: 'wrong_pass',
    empty: ''
} as const;

export const users = {
    standardUser: { username: availableUsernames.standard, password: password.valid, firstName: 'George', lastName: 'Papadopoulos', postalCode: '16452' },
    lockedUser: { username: availableUsernames.locked, password: password.valid },
    problemUser: { username: availableUsernames.problem, password: password.valid },
    performanceGlitchUser: { username: availableUsernames.performanceGlitch, password: password.valid },
    errorUser: { username: availableUsernames.error, password: password.valid },
    visualUser: { username: availableUsernames.visual, password: password.valid },
    unregisteredUser: { username: 'unregistered_user', password: password.valid },
    invalidPasswordUser: { username: availableUsernames.standard, password: password.invalid },
    emptyUsernameUser: { username: '', password: password.valid },
    emptyPasswordUser: { username: availableUsernames.standard, password: '' },
    upperCaseStandardUser: { username: availableUsernames.standard.toUpperCase(), password: password.valid.toUpperCase() }
} as const satisfies Record<string, User>;