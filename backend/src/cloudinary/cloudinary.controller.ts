import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cloudinary')
@UseGuards(AuthGuard)
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
