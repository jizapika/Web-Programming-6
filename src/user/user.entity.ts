import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../extra/base.entity";
import { PostEntity } from "../post/post.entity";
import { CommentEntity } from "../comment/comment.entity";
import { UserProfileEntity } from "../user_profile/user_profile.entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @OneToOne(() => UserProfileEntity, up => up.user)
  profile: UserProfileEntity;

  @Column({
    nullable: false,
    unique: true
  })
  login: string;

  @OneToMany(() => PostEntity, p => p.author, {
    nullable: true,
    cascade: true
  })
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, c => c.author, {
    nullable: true,
    cascade: true
  })
  comments: CommentEntity[];
}