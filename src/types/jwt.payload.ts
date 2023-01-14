export type JwtPayload = {
    email: string;
    sub: number;
    is_active:boolean;
    is_creator:boolean;
};