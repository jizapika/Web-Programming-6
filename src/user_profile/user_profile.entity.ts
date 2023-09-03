import { Entity, OneToOne, Column, JoinColumn } from "typeorm";
import { BaseEntity } from "../extra/base.entity";
import { UserEntity } from "../user/user.entity";

@Entity({ name: "user_profile" })
export class UserProfileEntity extends BaseEntity {
  @OneToOne(() => UserEntity, u => u.profile)
  @JoinColumn()
  user: UserEntity;

  @Column()
  lastname: string;

  @Column({
    nullable: false
  })
  firstname: string;

  @Column()
  surname: string;

  @Column()
  city: string;

  @Column()
  school: string;

  @Column()
  university: string;
}