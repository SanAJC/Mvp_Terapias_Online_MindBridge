import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma:PrismaService){}

  createSession(createSessionDto: CreateSessionDto) {
    return this.prisma.session.create({
      data:{
        therapistId: createSessionDto.therapistId,
        patientId: createSessionDto.patientId,
        startTime : createSessionDto.startTime,
        endTime: createSessionDto.endTime,
        meetingLink: createSessionDto.meetingLink,
        status: createSessionDto.status,
        notes: createSessionDto.notes
          ? {
              create: createSessionDto.notes.map((note) => ({
                content: note.content,
                therapistId: createSessionDto.therapistId,
                patientId: createSessionDto.patientId,
              })),
            }
          : undefined,
      }
    });
  }

  getSessions() {
    return this.prisma.session.findMany({
      orderBy:{ createdAt: 'desc'}
    });
  }

  getSession(id: string) {
    return this.prisma.session.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateSessionDto: UpdateSessionDto) {
    const existing = await this.getSession(id);
    if (!existing) throw new NotFoundException(`Session ${id} no encontrada`);

    const data: Prisma.SessionUpdateInput = {};

    if (updateSessionDto.therapistId !== undefined) {
      data.therapist = { connect: { id: updateSessionDto.therapistId } };
    }
    if (updateSessionDto.patientId !== undefined) {
      data.patient = { connect: { id: updateSessionDto.patientId } };
    }
    if (updateSessionDto.startTime !== undefined) {
      data.startTime = updateSessionDto.startTime;
    }
    if (updateSessionDto.endTime !== undefined) {
      data.endTime = updateSessionDto.endTime;
    }
    if (updateSessionDto.meetingLink !== undefined) {
      data.meetingLink = updateSessionDto.meetingLink;
    }
    if (updateSessionDto.status !== undefined) {
      data.status = updateSessionDto.status;
    }

    if (updateSessionDto.notes !== undefined) {
      const therapistId = updateSessionDto.therapistId ?? existing.therapistId;
      const patientId = updateSessionDto.patientId ?? existing.patientId;

      data.notes = {
        deleteMany: {},
        create: updateSessionDto.notes.map((note) => ({
          content: note.content,
          therapistId,
          patientId,
        })),
      };
    }

    return this.prisma.session.update({
      where: { id },
      data,
      include: { notes: true },
    });
  }

  remove(id: string) {
    this.getSession(id)
    return this.prisma.session.delete({
      where: { id }
    });
  }
}
