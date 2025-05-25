export type User = {
    username: string;
    password: string;
};

export const availableUsernames = {
    standard: 'standard_user',
    locked: 'locked_out_user',
    problem: 'problem_user',
    performanceGlitch: 'performance_glitch_user',
    error: 'error_user',
    visual: 'visual_user'
} as const;

export const password = {
    valid: 'secret_sauce',
    invalid: 'wrong_pass',
    empty: ''
} as const;

export const users = {
    standardUser: { username: availableUsernames.standard, password: password.valid },
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