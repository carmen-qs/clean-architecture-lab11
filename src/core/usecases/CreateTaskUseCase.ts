// src/core/usecases/CreateTaskUseCase.ts

import { Task } from '../entities/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';

/**
 * Caso de Uso: Crear una nueva tarea
 * Contiene la lógica de negocio para la creación de tareas
 */
export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(data: {
    title: string;
    description: string;
  }): Promise<Task> {
    // Validaciones de negocio
    if (!data.title) {
      throw new Error('El título es obligatorio');
    }

    if (!data.description) {
      throw new Error('La descripción es obligatoria');
    }

    // Crear la entidad
    const task = new Task(
      this.generateId(),
      data.title.trim(),
      data.description.trim()
    );

    // Persistir usando el repositorio (abstracción)
    return await this.taskRepository.save(task);
  }

  private generateId(): string {
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}