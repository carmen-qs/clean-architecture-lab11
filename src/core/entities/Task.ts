// src/core/entities/Task.ts

export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public completed: boolean = false,
    public createdAt: Date = new Date()
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.title || this.title.trim().length < 3) {
      throw new Error('El título debe tener al menos 3 caracteres');
    }
    if (this.title.length > 100) {
      throw new Error('El título no puede exceder 100 caracteres');
    }
  }

  complete(): void {
    this.completed = true;
  }

  uncomplete(): void {
    this.completed = false;
  }
}