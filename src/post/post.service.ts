import { Injectable } from "@nestjs/common";
import { PostEntity } from "./post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostDto } from "./dto/post.dto";

@Injectable()
export class PostService {
  async createPost(userId: number, text: string) {
      throw new Error("Method not implemented.");
  }
  constructor(
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>
  ) {
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

  async getPostById(id: number): Promise<PostDto> {
    throw new Error("Method not implemented.");
  }

  async getPostsByUser(userId: number): Promise<PostDto[]> {
    throw new Error("Method not implemented.");
  }
}