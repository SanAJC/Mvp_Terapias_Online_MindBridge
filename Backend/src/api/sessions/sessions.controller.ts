import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import {
  SessionsCreatePipe,
  SessionsUpdatePipe,
} from './pipes/sessions.pipe';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('sessions')
@UseGuards(RolesGuard)
@Roles(Role.THERAPIST, Role.COORDINATOR)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(
    @Body(SessionsCreatePipe) createSessionDto: CreateSessionDto,
  ) {
    return this.sessionsService.createSession(createSessionDto);
  }

  @Get()
  GetSessions() {
    return this.sessionsService.getSessions();
  }

  @Get(':id')
  GetSession(@Param('id') id: string) {
    return this.sessionsService.getSession(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(SessionsUpdatePipe) updateSessionDto: UpdateSessionDto,
  ) {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }
}
