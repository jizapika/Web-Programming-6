import { ApiProperty } from '@nestjs/swagger';

export class ListDto<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  constructor(data: T[]) {
    this.data = data;
  }
}