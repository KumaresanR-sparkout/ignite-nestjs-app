import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { successResponse, errorResponse } from './utils/response_handler';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  getHello(@Res() res: Response) {
    return successResponse(res, 200, "Application started working fine...", {});
  }
}
