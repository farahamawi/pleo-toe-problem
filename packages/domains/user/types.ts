export interface User {
    id: string
    first_name: string
    last_name: string
    company_name: string
    ssn: string
    email: string
    pass: string
}

export interface ReturnedUser {
    id: string
    first_name: string
    last_name: string
    company_name: string
    ssn: string
    email: string
}

export interface TokenGeneration {
    access_token: string
    expires_in: string
    token_type: string
}


