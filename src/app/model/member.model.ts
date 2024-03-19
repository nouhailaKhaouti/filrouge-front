export interface Member{
    num:Number,
    name:String,
    familyName:String,
    nationality:String,
    identityDocument:String,
    identityNumber:String,
    accountApproved:boolean|false,
    role:string|null
    email:string
}

export interface MemberPagination{
    totalMembers: number,
    members:Member[], 
    totalPages: number,
    currentPage: number,
}