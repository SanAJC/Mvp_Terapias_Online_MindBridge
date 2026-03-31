import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';


@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get(':id')
  getPatient(@Param('id') id: string) {
    return this.patientsService.getPatient(id);
  }

  getClinicalNotes(@Param('id') id: string) {
    return this.patientsService.getClinicalNotes(id);
  }

  getSessions(@Param('id') id: string) {
    return this.patientsService.getSessions(id);
  }

  getTherapists(@Param('id') id: string) {
    return this.patientsService.getTherapists(id);
  }
}
