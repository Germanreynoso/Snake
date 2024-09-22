import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadFileDto } from './dto/upload-file.dto';
import { Product } from 'src/products/products.entity';
import { CloudinaryService } from 'src/services/cloudinary.service';
  

@Injectable()
export class FileUploadService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async uploadFile(file: Express.Multer.File, id: string) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    console.log(file.fieldname);  // Asegúrate de que 'file' no es undefined

    const url = await this.cloudinaryService.uploadFile({
      fieldname: file.fieldname,
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });

    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.imgUrl = url;
    await this.productRepository.save(product);

    return { imgUrl: url };
  }
}
