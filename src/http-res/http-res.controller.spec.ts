import { Test, TestingModule } from '@nestjs/testing';
import { HttpResController } from './http-res.controller';

describe('HttpResController', () => {
  let controller: HttpResController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HttpResController],
    }).compile();

    controller = module.get<HttpResController>(HttpResController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
