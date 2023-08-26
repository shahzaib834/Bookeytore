import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile() image: Express.Multer.File
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return this.cloudinaryService.uploadFile(image);
  }
}
