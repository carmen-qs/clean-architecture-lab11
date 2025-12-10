// src/application/TaskController.ts

import { CreateTaskUseCase } from '../core/usecases/CreateTaskUseCase';
import { GetTasksUseCase } from '../core/usecases/GetTasksUseCase';

/**
 * Controlador que actúa como punto de entrada
 * Convierte las solicitudes en llamadas a casos de uso
 */
export class TaskController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private getTasksUseCase: GetTasksUseCase
  ) {}

  async createTask(request: any): Promise<any> {
    try {
      console.log('\n[CONTROLLER] Creando tarea...');
      
      const task = await this.createTaskUseCase.execute({
        title: request.title,
        description: request.description
      });

      return {
        success: true,
        statusCode: 201,
        data: {
          id: task.id,
          title: task.title,
          description: task.description,
          completed: task.completed,
          createdAt: task.createdAt
        }
      };
    } catch (error: any) {
      console.error('[CONTROLLER] Error:', error.message);
      return {
        success: false,
        statusCode: 400,
        error: error.message
      };
    }
  }

  async getAllTasks(filters?: { completed?: boolean }): Promise<any> {
    try {
      console.log('\n[CONTROLLER] Obteniendo tareas...');
      
      const tasks = await this.getTasksUseCase.execute(filters);

      return {
        success: true,
        statusCode: 200,
        data: tasks.map(task => ({
          id: task.id,
          title: task.title,
          description: task.description,
          completed: task.completed,
          createdAt: task.createdAt
        })),
        total: tasks.length
      };
    } catch (error: any) {
      console.error('[CONTROLLER] Error:', error.message);
      return {
        success: false,
        statusCode: 500,
        error: error.message
      };
    }
  }
}