import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalNotesController } from './clinical-notes.controller';
import { ClinicalNotesService } from './clinical-notes.service';

describe('ClinicalNotesController', () => {
  let controller: ClinicalNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicalNotesController],
      providers: [ClinicalNotesService],
    }).compile();

    controller = module.get<ClinicalNotesController>(ClinicalNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
