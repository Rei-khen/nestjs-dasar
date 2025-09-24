import { Test, TestingModule } from '@nestjs/testing';
import { ProviderNestService } from './provider-nest.service';

describe('ProviderNestService', () => {
  let service: ProviderNestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderNestService],
    }).compile();

    service = module.get<ProviderNestService>(ProviderNestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
