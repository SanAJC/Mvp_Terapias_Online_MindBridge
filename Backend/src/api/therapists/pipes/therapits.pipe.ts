import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { PrismaService } from '../../../database/prisma.service';
import { TherapistProfile } from '@prisma/client';
import { AddPatientDto } from "../dto/add-patient";
@Injectable()
export class TherapistsPipe implements PipeTransform {
    constructor(private readonly prisma: PrismaService) {}
    
    async transform(value: AddPatientDto) : Promise<AddPatientDto> {
        await this.isTherapist(value.therapistId);
        await this.isPatient(value.patientId);
        return value;
    }
    private async isTherapist(id: string) {
        const therapist = await this.prisma.therapistProfile.findUnique({
            where: { id },
        });
        if (!therapist) throw new BadRequestException('Therapist not found');
    }

    private async isPatient(id: string) {
        const patient = await this.prisma.patientProfile.findUnique({
            where: { id },
        });
        if (!patient) throw new BadRequestException('Patient not found');
    }
}