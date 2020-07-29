export class FbUserInfo {
    fbId:string;
    fbEmail:string;
}

export class GoogleUserInfo {
    googleId:string;
    googleEmail:string;
}

//1:fb 2:google
export class UserInfo {
    loginType:number;
    userId:string;
    userEmail:string;
    userName:string;
    userPhoto:string;
}



