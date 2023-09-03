import { Column, Entity, Index, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../extra/base.entity';
import { CommentEntity } from '../comment/comment.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'posts' })
@Index(['id'])
export class PostEntity extends BaseEntity {

  @Column({ nullable: false })
  text: string;

  @ManyToOne(() => UserEntity, u => u.posts, {
    nullable: false,
  })
  @JoinColumn({ name: 'authorId' })
  author: UserEntity;

  @OneToMany(() => CommentEntity, c => c.post, {
    nullable: true,
    cascade: true,
  })
  comments: CommentEntity[];
}