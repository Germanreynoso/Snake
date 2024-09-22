import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { CategoriesService } from "./categories.services";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Category } from "./entities/category.entity";

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @ApiOperation({ summary: 'Crear una nueva categoría' })
    @ApiResponse({ status: 201, description: 'Categoría creada', type: Category })
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas las categorías' })
    @ApiResponse({ status: 200, description: 'Lista de categorías', type: [Category] })
    async findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una categoría por ID' })
    @ApiResponse({ status: 200, description: 'Categoría encontrada', type: Category })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    async findOne(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.findOne(id);
    }
}
