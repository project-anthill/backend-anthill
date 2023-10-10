import { Injectable, NotFoundException } from "@nestjs/common";
import { UserProfileService } from "../../services/userProfile.service";
import { IFindManyUserRequest, IFindManyUserResponse } from "./findManyUser.interface";

@Injectable()
export class FindManyUserUseCase {
    constructor(
        private userProfileService: UserProfileService       
    ){}

    async handler(request: IFindManyUserRequest): Promise<IFindManyUserResponse[]>{
        try{
            const userProfiles = await this.userProfileService.findMany(request);
            const cleanUserProfiles = userProfiles.map(profile => {
                delete profile.password;
                delete profile.id;
                return profile;
              });
            return cleanUserProfiles;
        } catch(error){
            throw new NotFoundException('Nobody was found!');
        }
    }
}