import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClinicalNoteDto } from './dto/create-clinical-note.dto';
import { UpdateClinicalNoteDto } from './dto/update-clinical-note.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClinicalNotesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createClinicalNoteDto: CreateClinicalNoteDto) {
    return this.prisma.clinicalNote.create({
      data: {
        sessionId: createClinicalNoteDto.sessionId,
        therapistId: createClinicalNoteDto.therapistId,
        patientId: createClinicalNoteDto.patientId,
        content: createClinicalNoteDto.content,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.session.findMany({
      where: { id },
      orderBy:{ createdAt: 'desc'}
    });
  }

  async update(id: string, updateClinicalNoteDto: UpdateClinicalNoteDto) {
    await this.findOne(id);

    const data: Prisma.ClinicalNoteUpdateInput = {};

    if (updateClinicalNoteDto.sessionId !== undefined) {
      data.session = { connect: { id: updateClinicalNoteDto.sessionId } };
    }
    if (updateClinicalNoteDto.therapistId !== undefined) {
      data.therapist = { connect: { id: updateClinicalNoteDto.therapistId } };
    }
    if (updateClinicalNoteDto.patientId !== undefined) {
      data.patient = { connect: { id: updateClinicalNoteDto.patientId } };
    }
    if (updateClinicalNoteDto.content !== undefined) {
      data.content = updateClinicalNoteDto.content;
    }

    if (Object.keys(data).length === 0) {
      return this.findOne(id);
    }

    return this.prisma.clinicalNote.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.clinicalNote.delete({
      where: { id },
    });
  }
}
