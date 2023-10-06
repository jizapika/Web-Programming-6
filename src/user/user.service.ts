import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "./dto/user.dto";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserProfileEntity } from "src/user_profile/user_profile.entity";
import { UserWithProfileDto } from "./dto/user-with-profile.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(UserEntity)
    private profileRepo: Repository<UserProfileEntity>
  ) {
  }

  async getUserBySupertokensId(supertokensUserId: string): Promise<UserWithProfileDto> {
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

  async findUserById(id) {
    return await this.userRepo
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOneOrFail();
  }

  async checkPassword(password: string, login: string) {
  }

  async findUserByLoginReturnId(login: string) {
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

  create(createUserDto: UserDto) {
    return "This action adds a new user";
  }

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
