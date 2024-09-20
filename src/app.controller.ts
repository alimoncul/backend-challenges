import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('example')
@Controller('example')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get example data' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiQuery({ name: 'name', required: false, description: 'Your name' })
  getExampleData(@Query('name') name?: string): string {
    return this.appService.getExampleData(name);
  }
}
