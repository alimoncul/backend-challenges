import { Get, Route } from "tsoa";

interface HealthResponse {
    live: string;
}

@Route("health")
export default class HealthController {
    @Get("/")
    public async getHealth(): Promise<HealthResponse> {
      return { live: new Date().toISOString() };
    }
  }