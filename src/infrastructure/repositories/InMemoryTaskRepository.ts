// src/infrastructure/repositories/InMemoryTaskRepository.ts

import { Task } from '../../core/entities/Task';
import { ITaskRepository } from '../../core/repositories/ITaskRepository';

/**
 * Implementación concreta del repositorio usando memoria (array)
 * Esta es la capa de INFRAESTRUCTURA que implementa el contrato del CORE
 */
export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Task[] = [];

  async save(task: Task): Promise<Task> {
    this.tasks.push(task);
    console.log(`[REPO] Tarea guardada: ${task.id}`);
    return task;
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find(t => t.id === id);
    return task || null;
  }

  async findAll(): Promise<Task[]> {
    return [...this.tasks]; // Retornar copia para evitar mutaciones
  }

  async delete(id: string): Promise<boolean> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    
    this.tasks.splice(index, 1);
    console.log(`[REPO] Tarea eliminada: ${id}`);
    return true;
  }

  async update(task: Task): Promise<Task> {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index === -1) {
      throw new Error(`Tarea no encontrada: ${task.id}`);
    }
    
    this.tasks[index] = task;
    console.log(`[REPO] Tarea actualizada: ${task.id}`);
    return task;
  }
}