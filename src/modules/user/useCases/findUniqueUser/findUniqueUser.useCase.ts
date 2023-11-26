import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../../services/user.service";
import { UserProfileService } from "../../services/userProfile.service";
import { IFindUniqueUserRequest, IFindUniqueUserResponse } from "./findUniqueUser.interface";

@Injectable()
export class FindUniqueUserUseCase {
    constructor(
        private userService: UserService,
        private userProfileService: UserProfileService       
    ){}

    async execute(request: IFindUniqueUserRequest): Promise<IFindUniqueUserResponse>{
        try{
            const userProfile = await this.userProfileService.findOne(request);
            !request.userId ? request.userId = userProfile.userId : "";
            const user = await this.userService.findOne(request);
            delete user.id;
            if(user.isActive == true)
                delete user.deactivatedAt && delete user.deactivatedById
            delete userProfile.password && delete userProfile.id;
            return { ...user, ...userProfile };
        } catch(error){
            throw new NotFoundException('User profile not found!');
        }
    }
}