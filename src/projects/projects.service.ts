import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from '../projects/entities/project.entity';
import { DeleteResult, Repository } from "typeorm";
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
        name: input.name,
        description: input.description,
        startDate: input.startDate,
        endDate: input.endDate,
      })
    );
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async updateProject(id: number, updatedProject: Partial<Project>): Promise<Project | null> {
    const project = await this.projectsRepository.findOne(id);
    if (!project) {
      return null;
    }
    await this.projectsRepository.update(id, updatedProject);
    return this.projectsRepository.findOne(id);
  }

  findOne(id: number) {
    return this.projectsRepository.findOne(id);
  }

  async deleteProject(id: number): Promise<DeleteResult> {
    return this.projectsRepository.delete(id);
  }
}
