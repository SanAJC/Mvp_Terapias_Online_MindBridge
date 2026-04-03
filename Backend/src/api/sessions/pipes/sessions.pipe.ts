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

@Injectable()
export class SessionsCreatePipe implements PipeTransform<CreateSessionDto, Promise<CreateSessionDto>> {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: CreateSessionDto): Promise<CreateSessionDto> {
    assertStartTimeNotPastDay(value.startTime);
    await this.assertTherapist(value.therapistId);
    await this.assertPatient(value.patientId);
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
