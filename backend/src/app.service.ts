import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'CS GO API IS RUNNING!';
  }
}
