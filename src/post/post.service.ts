import { Injectable } from "@nestjs/common";
import { PostEntity } from "./post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostDto } from "./dto/post.dto";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>
  ) {
  }

  async getPosts(
    postFilterDto: PostFilterDto,
    pageOptionsDto: PageOptions
  ): Promise<PageDto<PostDto>> {
    let qb = this.postRepo
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author");

    qb = postFilterDto
      .applyFilters(qb)
      .orderBy("post.createdAt", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await qb.getCount();
    const { entities } = await qb.getRawAndEntities();

    return new PageDto(entities, new PageMeta({ itemCount, pageOptionsDto }));
  }

  async getPost(id: number): Promise<PostWithAuthorDto> {
    return this.postRepo
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author")
      .where("post.id = :id", { id })
      .getOneOrFail();
  }

  async createPost(userId: number, text: string):
    Promise<void> {
    await this.postRepo
      .createQueryBuilder()
      .insert()
      .into(PostEntity)
      .values({
        body: text,
        name: createPostDto.name,
        isPublic: createPostDto.isPublic,
        author: { id: userId }
      })
      .execute();
  }

  async editPost(
    id: number,
    editedText: string
  ): Promise<void> {

    await this.postRepo
      .createQueryBuilder()
      .update(PostEntity)
      .set({
        text: editedText
      })
      .where("id = :id", { id: id })
      .execute();
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepo
      .createQueryBuilder()
      .delete()
      .from(PostEntity)
      .where("id = :id", { id })
      .execute();
  }
}