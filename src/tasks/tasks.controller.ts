import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('projects/:project_id/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(
    @Param('project_id') project_id: number,
    @Body() createTaskDto: CreateTaskDto
  ) {
    return this.tasksService.createTask(project_id, createTaskDto);
  }

  @Get()
  getTasksInProject(@Param('project_id') projectId: string) {
    return this.tasksService.getTasksInProject(projectId);
  }

  @Get(':id')
  getOneTaskInProject(@Param('id') id: string) {
    return this.tasksService.getOneTaskInProject(+id);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updatedTask: UpdateTaskDto
  ){
    const project = await this.tasksService.updateTask(id, updatedTask);
    if (!project) {
      return 'Project not found';
    }
    return project;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<string> {
    const deleteResult = await this.tasksService.deleteTask(id);
    if (deleteResult.affected === 0) {
      return 'Task not found';
    }
    return 'Task deleted successfully';
  }
}
