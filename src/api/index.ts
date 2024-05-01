import { RegisterInfo, VerfiyInfo } from '@/types/register';
import request from '../utils/request';
import { LoginInfo } from '@/types/login';

export const loginApi = (loginInfo: LoginInfo) => {
    return request({
        url: "/authentication/login",
        method: "post",
        params: loginInfo
    });
}

export const registerApi=(registerInfo:RegisterInfo)=>{
    return request({
        url: "/authentication/register",
        method:"post",
        params:registerInfo
    });
}

export const verfiyApi=(email:string,verfiyCode:string)=>{
    return request({
        url:"/authentication/verfiy-activation",
        method:"post",
        params:{
            email,
            verfiyCode
        }
    })
}

export const unfinishRepairApi=()=>{
    return request({
        url:"/repair-records/unfinished",
        method:"get"
    })
}

export const finishRepairApi=()=>{
    return request({
        url:"/repair-records/finished",
        method:"get"
    })
}

export const updateStatusApi=(recordId:string,reporter:string)=>{
    return request({
        url:"/repair-records/update-status",
        method:"put",
        params:{
            recordId,
            reporter
        }
    })
}

export const getUserInfo=()=>{
    return request({
        url:"/user/info",
        method:"get",
    })
}

export const updateUserInfoApi=(userId:string,userName:string,password:string,coded:string,gid:string)=>{
    return request({
        url:"/user/update",
        method:"post",
        params:{
            userId,
            userName,
            password,
            coded,
            gid
        }
    })
}


export const deleteUserInfoApi=(userId:string)=>{
    return request({
        url:"/user/delete",
        method:"post",
        params:{
            userId
        }
    })
}

export const selectUniFinishRecordByUserIdApi=(userId:string)=>{
    return request({
        url:"/repair-records/finished/user-self",
        method:"get",
        params:{
            userId
        }
    })
}


export const selectFinishRecordByUserIdApi=(userId:string)=>{
    return request({
        url:"/repair-records/finished/user-self",
        method:"get",
        params:{
            userId
        }
    })
}

export const addRepairRecordApi=(adder:string,clientName:string,phoneNumber:string,location:string,note:string)=>{
    return request({
        url:"/repair-records/add",
        method:"post",
        params:{
            adder,
            clientName,
            phoneNumber,
            location,
            note
        }
    })
}

export const updateRepairRecordApi=(recordId:string,reporter:string,solution:string)=>{
    return request({
        url:"/repair-records/update-status",
        method:"put",
        params:{
            recordId,
            reporter,
            solution
        }
    })
}

export const deleteRepairRecordByRecordIdApi=(recordId:string)=>{
    return request({
        url:"/repair-records/delete",
        method:"post",
        params:{
            recordId
        }
    })
}

export const modifyRepairRecordApi=(recordId:string,clientName:string,phoneNumber:string,location:string,note:string,solution:string)=>{
    return request({
        url:"/repair-records/modify",
        method:"put",
        params:{
            recordId,
            location,
            clientName,
            phoneNumber,
            note,
            solution
        }
    })
}