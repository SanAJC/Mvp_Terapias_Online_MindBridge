import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { CreateSessionDto } from '../dto/create-session.dto';
import { UpdateSessionDto } from '../dto/update-session.dto';

function assertStartTimeNotPastDay(startTime: Date) {
  const start = new Date(startTime);
  if (Number.isNaN(start.getTime())) {
    throw new BadRequestException('startTime inválido');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDay = new Date(start);
  startDay.setHours(0, 0, 0, 0);

  if (startDay < today) {
    throw new BadRequestException(
      'La fecha de inicio no puede ser de un día que ya pasó',
    );
  }
}

function assertEndTimeAfterStartTime(startTime: Date, endTime: Date) {
  if (endTime <= startTime) {
    throw new BadRequestException(
      'La fecha de fin no puede ser anterior a la fecha de inicio',
    );
  }
}

@Injectable()
export class SessionsCreatePipe implements PipeTransform<CreateSessionDto, Promise<CreateSessionDto>> {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: CreateSessionDto): Promise<CreateSessionDto> {
    assertStartTimeNotPastDay(value.startTime);
    assertEndTimeAfterStartTime(value.startTime, value.endTime);
    await this.assertTherapist(value.therapistId);
    await this.assertPatient(value.patientId);
    await this.sessionAvailability(value.startTime, value.endTime);
    return value;
  }

  private async assertTherapist(id: string) {
    const therapist = await this.prisma.therapistProfile.findUnique({
      where: { id },
    });
    if (!therapist) {
      throw new BadRequestException('Therapist not found');
    }
  }

  private async assertPatient(id: string) {
    const patient = await this.prisma.patientProfile.findUnique({
      where: { id },
    });
    if (!patient) {
      throw new BadRequestException('Patient not found');
    }
  }

  private async sessionAvailability(startTime: Date, endTime: Date) {
    const sessions = await this.prisma.session.findMany({
      where: {
        startTime: { lt: endTime },
        endTime: { gt: startTime },
      },
    });
    if (sessions.length > 0) {
      throw new BadRequestException('Session not available');
    }
  }
}

@Injectable()
export class SessionsUpdatePipe
  implements PipeTransform<UpdateSessionDto, Promise<UpdateSessionDto>>
{
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: UpdateSessionDto): Promise<UpdateSessionDto> {
    if (value.startTime !== undefined) {
      assertStartTimeNotPastDay(value.startTime);
    }
    if (value.therapistId !== undefined) {
      await this.assertTherapist(value.therapistId);
    }
    if (value.patientId !== undefined) {
      await this.assertPatient(value.patientId);
    }
    return value;
  }

  private async assertTherapist(id: string) {
    const therapist = await this.prisma.therapistProfile.findUnique({
      where: { id },
    });
    if (!therapist) {
      throw new BadRequestException('Therapist not found');
    }
  }

  private async assertPatient(id: string) {
    const patient = await this.prisma.patientProfile.findUnique({
      where: { id },
    });
    if (!patient) {
      throw new BadRequestException('Patient not found');
    }
  }
}
