import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { PrismaService } from 'src/database/prisma.service';
import { PatientProfile } from '@prisma/client';
@Injectable()
export class PatientsPipe implements PipeTransform {
    constructor(private readonly prisma: PrismaService) {}
    async transform(value: PatientProfile): Promise<PatientProfile> {
        await this.isPatient(value.id);
        return value;
    }
    private async isPatient(id: string) {
        const patient = await this.prisma.patientProfile.findUnique({
            where: { id },
        });
        if (!patient) throw new BadRequestException('Patient not found');
    }
}