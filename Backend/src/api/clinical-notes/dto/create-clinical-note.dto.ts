import { IsString, IsNotEmpty } from "class-validator";

export class CreateClinicalNoteDto {

    @IsNotEmpty()
    @IsString()
    sessionId : string

    @IsNotEmpty()
    @IsString()
    patientId : string

    @IsNotEmpty()
    @IsString()
    therapistId : string

    @IsNotEmpty()
    @IsString()
    content : string
}
