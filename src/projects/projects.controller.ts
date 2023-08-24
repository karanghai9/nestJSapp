import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body() input: CreateProjectDto,
  ) {
    return await this.projectsService.create(input);
  }

  @Get()
  async findAll() {
    const projects = await this.projectsService.findAll();
    return projects;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() updatedProject: UpdateProjectDto
  ){
    const project = await this.projectsService.updateProject(id, updatedProject);
    if (!project) {
      return 'Project not found';
    }
    return project;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
