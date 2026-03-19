import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { PatientsModule } from './api/patients/patients.module';
import { TherapistsModule } from './api/therapists/therapists.module';
import { SessionsModule } from './api/sessions/sessions.module';
import { AttendanceModule } from './api/attendance/attendance.module';
import { ClinicalNotesModule } from './api/clinical-notes/clinical-notes.module';
import { ReportsModule } from './api/reports/reports.module';
import { NotificationsModule } from './api/notifications/notifications.module';



@Module({
  imports: [UsersModule, PatientsModule, TherapistsModule, SessionsModule, AttendanceModule, ClinicalNotesModule, ReportsModule, NotificationsModule],
})
export class AppModule {}
