import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { PatientsModule } from './api/patients/patients.module';
import { TherapistsModule } from './api/therapists/therapists.module';
import { SessionsModule } from './api/sessions/sessions.module';
import { AttendanceModule } from './api/attendance/attendance.module';
import { ClinicalNotesModule } from './api/clinical-notes/clinical-notes.module';
import { ReportsModule } from './api/reports/reports.module';
import { NotificationsModule } from './api/notifications/notifications.module';

import { AuthMiddleware } from './auth/middlewares/jwt.middleware';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [AuthModule,UsersModule, PatientsModule, TherapistsModule, SessionsModule, AttendanceModule, ClinicalNotesModule, ReportsModule, NotificationsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
      )
      .forRoutes(
        { path: 'users', method: RequestMethod.ALL },
        { path: 'users/:id', method: RequestMethod.ALL },
        { path: 'patients', method: RequestMethod.ALL },
        { path: 'patients/:id', method: RequestMethod.ALL },
        { path: 'therapists', method: RequestMethod.ALL },
        { path: 'therapists/:id', method: RequestMethod.ALL },
        { path: 'sessions', method: RequestMethod.ALL },
        { path: 'sessions/:id', method: RequestMethod.ALL },
        { path: 'attendance', method: RequestMethod.ALL },
        { path: 'attendance/:id', method: RequestMethod.ALL },
        { path: 'clinical-notes', method: RequestMethod.ALL },
        { path: 'clinical-notes/:id', method: RequestMethod.ALL },
        { path: 'reports', method: RequestMethod.ALL },
        { path: 'reports/:id', method: RequestMethod.ALL },
      );
  }
}
