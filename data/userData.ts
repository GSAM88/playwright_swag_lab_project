export type User = {
    username: string;
    password: string;
}

export const validUsernames = {
    standard: 'standard_user',
    locked: 'locked_out_user',
    problem: 'problem_user',
    performanceGlitch: 'performance_glitch_user',
    error: 'error_user',
    visual: 'visual_user'
} as const

export const password = {
    valid: 'secret_sauce',
    invalid: 'wrong_pass',
    empty: ''
} as const

export const users = {
    standard: { username: validUsernames.standard, password: password.valid },
    locked: { username: validUsernames.locked, password: password.valid },
    problem: { username: validUsernames.problem, password: password.valid },
    performanceGlitch: { username: validUsernames.performanceGlitch, password: password.valid },
    error: { username: validUsernames.error, password: password.valid },
    visual: { username: validUsernames.visual, password: password.valid },
    unregistered: { username: 'unregistered_user', password: password.valid },
    invalidPassword: { username: validUsernames.standard, password: password.invalid },
    emptyUsername: { username: '', password: password.valid },
    emptyPassword: { username: validUsernames.standard, password: '' },
    upperCase: { username: validUsernames.standard.toUpperCase(), password: password.valid.toUpperCase() }
} as const satisfies Record<string, User>;