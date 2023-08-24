import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async createTask(project_id: number, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      project: { id: project_id }
    });
    return this.tasksRepository.save(task);
  }

  async getTasksInProject(projectId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { project: { id: projectId } }
    });
  }

  getOneTaskInProject(id: number) {
    return this.tasksRepository.findOne(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} task`;
  // }

  async deleteTask(id: number): Promise<DeleteResult> {
    return this.tasksRepository.delete(id);
  }
}
