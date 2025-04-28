export interface ISignupCredentials extends ISigninCredentials{
    fullName : string;
    phone: string;
    gender: string;
    profilePicture: string;
    cPassword: string;
}


export interface ISigninCredentials{
    email : string;
    password : string;
}