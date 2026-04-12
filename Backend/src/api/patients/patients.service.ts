import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  getPatient(id: string) {
    return this.prisma.patientProfile.findUnique({
      where: { id },
    });
  }

  getClinicalNotes(id: string) {
    return this.prisma.clinicalNote.findMany({
      where: { patientId: id },
    });
  }

  getSessions(id: string) {
    return this.prisma.session.findMany({
      where: { patientId: id },
      include: {
        therapist: {
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
      orderBy: { startTime: 'desc' },
    });
  }

  getTherapists(id: string) {
    return this.prisma.patientTherapist.findMany({
      where: { patientId: id },
      include: {
        therapist: {
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
    
}
