import { Injectable } from '@nestjs/common';
import type { AddPatientDto } from './dto/add-patient';
import { PrismaService } from '../../database/prisma.service';
@Injectable()
export class TherapistsService {
  constructor(private readonly prisma: PrismaService) {}


  getTherapist(id: string) {
    return this.prisma.therapistProfile.findUnique({
      where: { id },
    });
  }

  addPatient(addPatientDto: AddPatientDto) {
    return this.prisma.patientTherapist.create({
      data: {
        therapistId: addPatientDto.therapistId,
        patientId: addPatientDto.patientId,
      },
    });
  }
  getTherapistPatients(id: string) {
    return this.prisma.patientTherapist.findMany({
      where: { therapistId: id },
    });
  }
  getTherapistSessions(id: string) {
    return this.prisma.session.findMany({
      where: { therapistId: id },
    });
  }
  getTherapistClinicalNotes(id: string) {
    return this.prisma.clinicalNote.findMany({
      where: { therapistId: id },
    });
  }
}
