import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, body } = req;
    const start = Date.now();
    const bodyHasData = Object.keys(body).length > 0;

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${duration}ms${bodyHasData ? ` - Body: ${JSON.stringify(body)}` : ``}`,
      );
    });

    next();
  }
}
