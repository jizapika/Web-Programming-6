import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "./dto/user.dto";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserProfileEntity } from "src/user_profile/user_profile.entity";
import { UserWithProfileDto } from "./dto/user-with-profile.dto";
import { EditProfileDto } from "src/user_profile/dto/edit-profile.dto";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(UserProfileEntity)
    private profileRepo: Repository<UserProfileEntity>
  ) {
  }

  async editProfile(
    editedProfile: EditProfileDto
  ) {
    // const profile = await this.profileRepo
    //   .createQueryBuilder("user_profile")
    //   .where("user_profile.id = :id", { id: editedProfile.id })
    //   .getOne();
    // profile.firstname = editedProfile.firstname
    // profile.lastname = editedProfile.lastname
    // profile.surname = editedProfile.surname
    // profile.city = editedProfile.city
    // profile.school = editedProfile.school
    // profile.university = editedProfile.university

    // const profile = await this.profileRepo
    //   .createQueryBuilder("user_profile")
    //   .leftJoinAndSelect("user_profile.userId", "users")
    //   .where("users.id = :id", { id: editedProfile.userId })
    //   .getOne();
    // profile.firstname = editedProfile.firstname
    // profile.lastname = editedProfile.lastname
    // profile.surname = editedProfile.surname
    // profile.city = editedProfile.city
    // profile.school = editedProfile.school
    // profile.university = editedProfile.university
    // await this.profileRepo.save(profile);

    // await this.profileRepo.update({ user: {id: editedProfile.userId} }, editedProfile);


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

  async getUserWithProfileBySupertokensId(supertokensUserId: string): Promise<UserWithProfileDto> {
    const user = await this.userRepo
      .createQueryBuilder()
      .select("users")
      .from(UserEntity, "users")
      .leftJoinAndSelect("users.profile", "profile")
      .where("users.supertokensUserId = :supertokensUserId", {
        supertokensUserId
      })
      .getOne();

    if (!user) {
      throw new Error("User not found"); // Или какое-либо другое сообщение об ошибке
    }

    if (!user.login) {
      throw new Error("User login is missing"); // Или обработка отсутствия логина
    }

    return user;
  }

  async findUserById(id : number) {
    return await this.userRepo
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOneOrFail();
  }

  async createUser(userDto: CreateUserDto) {
    // const newUser = new UserEntity();
    // newUser.login = userDto.email;
    // newUser.supertokensUserId = userDto.supertokensUserId;
    // newUser.posts = [];
    // newUser.comments = [];
    //
    // const newProfile = new UserProfileEntity();
    // newProfile.firstname = userDto.firstname;
    // newProfile.lastname = userDto.lastname;
    // newProfile.user = newUser;
    //
    // await this.userRepo.save(newUser);
    // await this.profileRepo.save(newProfile);
    const user = await this.userRepo
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([{
        login: userDto.email,
        supertokensUserId: userDto.supertokensUserId,
        posts: [],
        comments: []
      }])
      .execute();

    await this.profileRepo
      .createQueryBuilder()
      .insert()
      .into(UserProfileEntity)
      .values([{
        firstname: userDto.firstname,
        lastname: userDto.lastname,
        user: { id: user.identifiers[0].id }
      }])
      .execute();
  }

  // async login(user: UserDto) {
  //   try {
  //     const response = await supertokensThirdParty.signInUp();
  //
  //     if (response && response.user && response.user.id) {
  //       return response.user.id;
  //     } else {
  //       throw new Error('Authentication failed');
  //     }
  //   } catch (error) {
  //     throw new Error('Authentication failed');
  //   }
  // }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
