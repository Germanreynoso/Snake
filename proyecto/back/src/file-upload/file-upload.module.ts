import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { Product } from 'src/products/products.entity';
import { CloudinaryService } from 'src/services/cloudinary.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => ProductsModule),
  ],
  providers: [FileUploadService, CloudinaryService],
  controllers: [FileUploadController],
  exports: [FileUploadService],
})
export class FileUploadModule {}
