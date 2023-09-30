import { SetMetadata } from '@nestjs/common';

export const Session = (...args: string[]) => SetMetadata('session', args);
