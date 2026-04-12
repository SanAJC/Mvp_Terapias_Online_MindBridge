import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TherapistsService } from './therapists.service';
import { AddPatientDto } from './dto/add-patient';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { TherapistsPipe } from './pipes/therapits.pipe';

@Controller('therapists')
@UseGuards(RolesGuard)
@Roles(Role.THERAPIST)
export class TherapistsController {
  constructor(private readonly therapistsService: TherapistsService) {}

  @Post('patients')
  addPatient(@Body(TherapistsPipe) addPatientDto: AddPatientDto) {
    return this.therapistsService.addPatient(addPatientDto);
  }

  @Get(':id')
  getTherapist(@Param('id') id: string) {
    return this.therapistsService.getTherapist(id);
  }

  @Get(':id/patients')
  getTherapistPatients(@Param('id') id: string) {
    return this.therapistsService.getTherapistPatients(id);
  }

  @Get(':id/sessions')
  getTherapistSessions(@Param('id') id: string) {
    return this.therapistsService.getTherapistSessions(id);
  }
  @Get(':id/clinical-notes')
  getTherapistClinicalNotes(@Param('id') id: string) {
    return this.therapistsService.getTherapistClinicalNotes(id);
  }
}
