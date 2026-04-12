import { Injectable, NotFoundException } from '@nestjs/common';
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

  async addPatient(addPatientDto: AddPatientDto) {
    return this.prisma.patientTherapist.create({
      data: {
        therapistId: addPatientDto.therapistId,
        patientId: addPatientDto.patientId,
      },
    });
  }
  getTherapistPatients(id: string) {
    return this.prisma.patientTherapist.findMany({
      where: { therapist: { userId: id } },
      include: {
        patient: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
    });
  }
  getTherapistSessions(id: string) {
    return this.prisma.session.findMany({
      where: { therapist: { userId: id } },
    });
  }
  getTherapistClinicalNotes(id: string) {
    return this.prisma.clinicalNote.findMany({
      where: { therapist: { userId: id } },
    });
  }
}
