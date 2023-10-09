import { Injectable } from "@nestjs/common";
import { PostEntity } from "./post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostDto } from "./dto/post.dto";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostService {
  async createPost(createPostDto: CreatePostDto) {
    await this.postRepo
      .createQueryBuilder()
      .insert()
      .into(PostEntity)
      .values({
        text: createPostDto.text,
        author: { id: createPostDto.authorId }
      })
      .execute();
  }

  constructor(
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>
  ) {
  }

  async readPostsByUser(userId: number): Promise<PostDto[]> {
    throw new Error("Method not implemented.");
  }

  async readPostById(id: number): Promise<PostDto> {
    return this.postRepo
      .createQueryBuilder("post")
      .where("post.id = :id", { id })
      .getOneOrFail();
  }

  async editPost(id: number, editedText: string) {
    throw new Error("Method not implemented.");
  }

  async deletePost(id: number) {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<PostDto[]> {
    throw new Error("Method not implemented.");
  }
}