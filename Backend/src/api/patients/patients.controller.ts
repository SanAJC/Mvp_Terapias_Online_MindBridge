import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PatientsPipe } from './pipes/patients.pipe';

@Controller('patients')
@UseGuards(RolesGuard)
@Roles(Role.PATIENT)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get(':id')
  getPatient(@Param('id', PatientsPipe) id: string) {
    return this.patientsService.getPatient(id);
  }
  @Get(':id/clinical-notes')
  getClinicalNotes(@Param('id', PatientsPipe) id: string) {
    return this.patientsService.getClinicalNotes(id);
  }

  @Get(':id/sessions')
  getSessions(@Param('id', PatientsPipe) id: string) {
    return this.patientsService.getSessions(id);
  }

  @Get(':id/therapists')
  getTherapists(@Param('id', PatientsPipe) id: string) {
    return this.patientsService.getTherapists(id);
  }
}
