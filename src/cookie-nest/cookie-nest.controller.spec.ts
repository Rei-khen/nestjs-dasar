import { Test, TestingModule } from '@nestjs/testing';
import { CookieNestController } from './cookie-nest.controller';

describe('CookieNestController', () => {
  let controller: CookieNestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CookieNestController],
    }).compile();

    controller = module.get<CookieNestController>(CookieNestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
