import { Entity, OneToOne, Column, JoinColumn } from "typeorm";
import { BaseEntity } from "../extra/base.entity";
import { UserEntity } from "../user/user.entity";

@Entity({ name: "user_profile" })
export class UserProfileEntity extends BaseEntity {
  @OneToOne(() => UserEntity, u => u.profile)
  @JoinColumn()
  user: UserEntity;

  @Column({
    nullable: false
  })
  firstname: string;

  @Column({
    nullable: false
  })
  lastname: string;

  @Column({
    nullable: true
  })
  surname: string;

  @Column({
    nullable: true
  })
  city: string;

  @Column({
    nullable: true
  })
  school: string;

  @Column({
    nullable: true
  })
  university: string;
}