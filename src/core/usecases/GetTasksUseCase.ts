// src/core/usecases/GetTasksUseCase.ts

import { Task } from '../entities/Task';

import { ITaskRepository } from '../repositories/ITaskRepository';
/**
 * Caso de Uso: Obtener todas las tareas
 * Puede incluir lógica de filtrado o ordenamiento
 */
export class GetTasksUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(filters?: {
    completed?: boolean;
  }): Promise<Task[]> {
    const allTasks = await this.taskRepository.findAll();

    // Lógica de negocio: filtrar si se especifica
    if (filters?.completed !== undefined) {
      return allTasks.filter(task => task.completed === filters.completed);
    }

    // Ordenar por fecha de creación (más recientes primero)
    return allTasks.sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}