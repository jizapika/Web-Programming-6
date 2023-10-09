import { Injectable } from "@nestjs/common";
import { EditProfileDto } from "./dto/edit-profile.dto";
import { UserProfileEntity } from "./user_profile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfileEntity)
    private profileRepo: Repository<UserProfileEntity>
  ) {
  }

  async editProfile(
    editedProfile: EditProfileDto
  ) {
    await this.profileRepo
      .createQueryBuilder()
      .update(UserProfileEntity)
      .set({
        firstname: editedProfile.firstname,
        lastname: editedProfile.lastname,
        surname: editedProfile.surname,
        city: editedProfile.city,
        school: editedProfile.school,
        university: editedProfile.university
      })
      .where("userId = :id", { id: editedProfile.userId })
      .execute();
  }
}
