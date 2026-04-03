import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClinicalNotesService } from './clinical-notes.service';
import { CreateClinicalNoteDto } from './dto/create-clinical-note.dto';
import { UpdateClinicalNoteDto } from './dto/update-clinical-note.dto';

@Controller('clinical-notes')
export class ClinicalNotesController {
  constructor(private readonly clinicalNotesService: ClinicalNotesService) {}

  @Post()
  CreateNote(@Body() createClinicalNoteDto: CreateClinicalNoteDto) {
    return this.clinicalNotesService.create(createClinicalNoteDto);
  }

  @Get(':id')
  GetNote(@Param('id') id: string) {
    return this.clinicalNotesService.findOne(id);
  }

  @Patch(':id')
  UpdateNote(@Param('id') id: string, @Body() updateClinicalNoteDto: UpdateClinicalNoteDto) {
    return this.clinicalNotesService.update(id, updateClinicalNoteDto);
  }

  @Delete(':id')
  RemoveNote(@Param('id') id: string) {
    return this.clinicalNotesService.remove(id);
  }
}
