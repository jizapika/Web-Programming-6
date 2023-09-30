import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from "./dto/user.dto";
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>) {}

  async getUserBySupertokensId(supertokensUserId: string): Promise<UserDto> {
    return await this.userRepo
      .createQueryBuilder('user')
      .where('user.supertokensUserId = :supertokensUserId', {
        supertokensUserId,
      })
      .getOneOrFail();
  }

  async findUserById(id) {
    return await this.userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOneOrFail();
  }

  async checkPassword(password: string, login: string) {
  }

  async findUserByLoginReturnId(login: string) {
  }

  async createUser(userDto: CreateUserDto) {
    await this.userRepo
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({
        profile: {
          firstname: userDto.firstname,
          lastname: userDto.lastname
        },
        login: userDto.email,
        supertokensUserId: userDto.supertokensUserId,
        posts: [],
        comments: []
      })
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
    return 'This action adds a new user';
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
