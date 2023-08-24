import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from '../projects/entities/project.entity';
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>
  ) { }

  public async create(
    input: CreateProjectDto
  ): Promise<Project> {
    return await this.projectsRepository.save(
      new Project({...input, 
        title: input.title,
        description: input.description,
        startDate: input.startDate,
        endDate: input.endDate,
      })
    );
  }

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
