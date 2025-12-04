export interface Observer {
  update(data: any): void
  getId(): string
}

export interface Subject {
  addObserver(observer: Observer): void
  removeObserver(observer: Observer): void
  notifyObservers(data: any): void
}

export class BigDataEventManager implements Subject {
  private observers: Observer[] = []
  private eventCount = 0

  public addObserver(observer: Observer): void {
    this.observers.push(observer)
  }

  public removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs.getId() !== observer.getId())
  }

  public notifyObservers(data: any): void {
    this.observers.forEach((observer) => observer.update(data))
  }

  public publishBigDataEvent(eventType: string, data: any): void {
    this.eventCount++
    const eventData = {
      id: this.eventCount,
      type: eventType,
      data,
      timestamp: new Date().toISOString(),
    }
    this.notifyObservers(eventData)
  }

  public getEventCount(): number {
    return this.eventCount
  }
}

export class SystemMonitor implements Observer {
  private id: string
  private alerts: any[] = []

  constructor(id: string) {
    this.id = id
  }

  public update(data: any): void {
    this.alerts.push({
      ...data,
      monitorId: this.id,
      processed: new Date().toISOString(),
    })

    if (this.alerts.length > 100) {
      this.alerts = this.alerts.slice(-100)
    }
  }

  public getId(): string {
    return this.id
  }

  public getAlerts(): any[] {
    return [...this.alerts]
  }
}
