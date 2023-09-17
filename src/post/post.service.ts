import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
    getPostsByUser(userId: number): import("./dto/post.dto").PostDto[] | PromiseLike<import("./dto/post.dto").PostDto[]> {
        throw new Error("Method not implemented.");
    }
    getPostById(id: number): import("./dto/post.dto").PostDto | PromiseLike<import("./dto/post.dto").PostDto> {
        throw new Error("Method not implemented.");
    }
    editPost(id: number, editedText: string) {
        throw new Error("Method not implemented.");
    }
    deletePost(id: number) {
        throw new Error("Method not implemented.");
    }
    createPost(userId: number, text: string) {
        throw new Error("Method not implemented.");
    }
}
