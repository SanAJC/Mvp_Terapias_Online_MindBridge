import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';


@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get(':id')
  getPatient(@Param('id') id: string) {
    return this.patientsService.getPatient(id);
  }
  @Get(':id/clinical-notes')
  getClinicalNotes(@Param('id') id: string) {
    return this.patientsService.getClinicalNotes(id);
  }

  @Get(':id/sessions')
  getSessions(@Param('id') id: string) {
    return this.patientsService.getSessions(id);
  }

  @Get(':id/therapists')
  getTherapists(@Param('id') id: string) {
    return this.patientsService.getTherapists(id);
  }
}
