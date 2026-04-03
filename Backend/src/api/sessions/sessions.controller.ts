import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import {
  SessionsCreatePipe,
  SessionsUpdatePipe,
} from './pipes/sessions.pipe';

@Controller('sessions')
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
