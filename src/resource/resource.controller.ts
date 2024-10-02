import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as os from 'os';

@ApiTags('resource')
@Controller('resource')
export class ResourceController {
  @Get('memory')
  @ApiOperation({ summary: 'Get memory usage' })
  @ApiResponse({ status: 200, description: 'Success' })
  getMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    const toMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);

    return {
      rss: `${toMB(memoryUsage.rss)} MB`,
      heapTotal: `${toMB(memoryUsage.heapTotal)} MB`,
      heapUsed: `${toMB(memoryUsage.heapUsed)} MB`,
      external: `${toMB(memoryUsage.external)} MB`,
      arrayBuffers: `${toMB(memoryUsage.arrayBuffers)} MB`,
    };
  }

  @Get('system')
  @ApiOperation({ summary: 'Get system information' })
  @ApiResponse({ status: 200, description: 'Success' })
  getSystemInfo() {
    return {
      platform: os.platform(),
      release: os.release(),
      totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
      freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
      uptime: `${(os.uptime() / 60 / 60).toFixed(2)} hours`,
    };
  }
}
