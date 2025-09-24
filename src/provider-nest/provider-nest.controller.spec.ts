import { Test, TestingModule } from '@nestjs/testing';
import { ProviderNestController } from './provider-nest.controller';

describe('ProviderNestController', () => {
  let controller: ProviderNestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderNestController],
    }).compile();

    controller = module.get<ProviderNestController>(ProviderNestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
