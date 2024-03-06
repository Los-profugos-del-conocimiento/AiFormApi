import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { GoogleService } from './google.service';
import { CreateGoogleDto } from './dto/create-google.dto';
import { UpdateGoogleDto } from './dto/update-google.dto';
import { Request } from 'express';

@Controller('api/auth')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('callback/google')
  create(@Req() request: Request) {
    const params = request.query;
    console.log({ params });
    return 'This action adds a new google';
    // return this.googleService.create(createGoogleDto);
  }

  @Post('signin/google')
  test(@Req() request: Request) {
    console.log({ request });
    return 'This action adds a new google2';
    // return this.googleService.getAuthorizationUrl();
  }
}
