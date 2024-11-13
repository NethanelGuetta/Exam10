export interface Imissile {
    name: string;
    amount: number;
}

export interface UserType {
    _id: string;
    username: string;
    password: string;
    organization: string;
    location: string
    resources: [Imissile];
    budget: number;
}