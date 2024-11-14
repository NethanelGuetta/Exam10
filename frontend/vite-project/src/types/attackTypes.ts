// export interface Imissile {
//     name: string;
//     amount: number;
// }

export interface AttackType {
    _id: string;
    missileName: string;
    location: string
    missileDetails:
    {
        name: string;
        description: string;
        speed: number;
    };
    status: "Launched" | "Hit" | "Intercepted"
}