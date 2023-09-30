import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptions {
  @ApiPropertyOptional({ enum: Order, default: Order.DESC })
  @IsEnum(Order)
  order?: Order = Order.DESC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  includeQuery(link: string): string {
    const queryString = `page=${this.page}&order=${this.order}&take=${this.take}`;

    if (link.includes('?')) {
      return `${link}&${queryString}`;
    }

    return `${link}?${queryString}`;
  }
}