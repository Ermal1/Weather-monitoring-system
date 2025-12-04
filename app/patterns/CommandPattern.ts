export interface Command {
  execute(): void
  undo(): void
  getDescription(): string
}

export class BigDataCommand implements Command {
  private action: () => void
  private undoAction: () => void
  private description: string

  constructor(action: () => void, undoAction: () => void, description: string) {
    this.action = action
    this.undoAction = undoAction
    this.description = description
  }

  public execute(): void {
    this.action()
  }

  public undo(): void {
    this.undoAction()
  }

  public getDescription(): string {
    return this.description
  }
}

export class CommandManager {
  private history: Command[] = []
  private currentIndex = -1

  public executeCommand(command: Command): void {
    this.history = this.history.slice(0, this.currentIndex + 1)

    command.execute()
    this.history.push(command)
    this.currentIndex++
  }

  public undo(): boolean {
    if (this.currentIndex >= 0) {
      this.history[this.currentIndex].undo()
      this.currentIndex--
      return true
    }
    return false
  }

  public redo(): boolean {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++
      this.history[this.currentIndex].execute()
      return true
    }
    return false
  }

  public getHistory(): Command[] {
    return [...this.history]
  }
}
