import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { GoogleService } from './google.service';
import { CreateGoogleDto } from './dto/create-google.dto';
import { UpdateGoogleDto } from './dto/update-google.dto';
import { Request } from 'express';

@Controller('api/auth/callback/google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  create(@Req() request: Request) {
    const params = request.query;
    console.log({ params });
    return 'This action adds a new google';
    // return this.googleService.create(createGoogleDto);
  }
}
