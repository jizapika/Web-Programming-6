import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Session, UseGuards } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { UserService } from "../user/user.service";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { SessionContainer } from "supertokens-node/recipe/session";
import { doReq } from "src/extra/request";

@WebSocketGateway({
  cors: { origin: "*" }
})
export class PostGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  static readonly postsRoom: string = "posts";

  afterInit(server: Server): any {
    console.log("init");
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<void> {
    console.log("client connected: " + client.id);
    return client.join(PostGateway.postsRoom);
  }

  async handleDisconnect(client: Socket): Promise<void> {
    console.log("client disconnected: " + client.id);
    return client.leave(PostGateway.postsRoom);
  }

  @SubscribeMessage("post")
  async createPost(
  ): Promise<boolean> {
    return this.server.to(PostGateway.postsRoom).emit("post");
  }
}