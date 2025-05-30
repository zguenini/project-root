import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            // Mock des méthodes du service si nécessaire
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Ajouter d'autres tests unitaires ici
});
