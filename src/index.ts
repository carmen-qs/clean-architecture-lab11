// src/index.ts


import { InMemoryTaskRepository } from "./infrastructure/repositories/InMemoryTaskRepository";
import { CreateTaskUseCase } from "./core/usecases/CreateTaskUseCase";
import { GetTasksUseCase } from "./core/usecases/GetTasksUseCase";
import { TaskController } from "./application/TaskController";



console.log('='.repeat(60));
console.log('DEMOSTRACIÓN DE CLEAN ARCHITECTURE');
console.log('Sistema de Gestión de Tareas');
console.log('='.repeat(60));

// 1. CAPA DE INFRAESTRUCTURA: Instanciar implementación concreta
const taskRepository = new InMemoryTaskRepository();

// 2. CAPA DE CASOS DE USO: Inyectar dependencias (DIP)
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const getTasksUseCase = new GetTasksUseCase(taskRepository);

// 3. CAPA DE APLICACIÓN: Crear controlador
const taskController = new TaskController(
  createTaskUseCase,
  getTasksUseCase
);

// 4. SIMULACIÓN DE USO DE LA APLICACIÓN
async function main() {
  console.log('\n📝 TEST 1: Crear primera tarea');
  const result1 = await taskController.createTask({
    title: 'Estudiar Clean Architecture',
    description: 'Revisar los conceptos de capas y DIP'
  });
  console.log('Resultado:', JSON.stringify(result1, null, 2));

  console.log('\n📝 TEST 2: Crear segunda tarea');
  const result2 = await taskController.createTask({
    title: 'Implementar proyecto',
    description: 'Desarrollar ejemplo con TypeScript'
  });
  console.log('Resultado:', JSON.stringify(result2, null, 2));

  console.log('\n📝 TEST 3: Crear tarea inválida (sin título)');
  const result3 = await taskController.createTask({
    title: '',
    description: 'Esto debería fallar'
  });
  console.log('Resultado:', JSON.stringify(result3, null, 2));

  console.log('\n📋 TEST 4: Listar todas las tareas');
  const result4 = await taskController.getAllTasks();
  console.log('Resultado:', JSON.stringify(result4, null, 2));

  console.log('\n' + '='.repeat(60));
  console.log('✅ Demostración completada');
  console.log('='.repeat(60));
}

// Ejecutar
main().catch(console.error);