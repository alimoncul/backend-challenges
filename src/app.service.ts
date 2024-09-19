import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getExampleData(name: string): string {
    this.logger.log('Log message for getExampleData');
    return `Hello${name ? ' ' + name : ''}, this is your example data!`;
  }
}
