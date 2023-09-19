import { Gender } from "src/shared/enums/gender.enum";
import { UserType } from "src/shared/enums/userType.enum";

export class CreateUserUseCaseDTO {
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  birthDate: Date;
  gender: Gender;
  type: UserType;
  password: string;
}