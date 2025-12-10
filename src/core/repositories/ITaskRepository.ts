// src/core/repositories/ITaskRepository.ts

import { Task } from '../entities/Task';

/**
 * Interfaz que define el contrato para el repositorio de tareas.
 * Esto permite la inversión de dependencias (DIP).
 */
export interface ITaskRepository {
  save(task: Task): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findAll(): Promise<Task[]>;
  delete(id: string): Promise<boolean>;
  update(task: Task): Promise<Task>;
}