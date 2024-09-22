import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: "The name of the product",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty({
    type: String,
    description: "The description of the product",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: Number,
    description: "The price of the product",
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;
 
  @ApiProperty({
    type: String,
    description: 'La URL de la imagen del producto',
    required: false,
    example: 'https://example.com/images/smartphone_xyz.jpg', // Ejemplo de URL de imagen
  })
  @IsString()
  @IsOptional()
  imgUrl?: string;

  @ApiProperty({
    type: String,
    description: "ID de la categoría del producto",
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
  
}