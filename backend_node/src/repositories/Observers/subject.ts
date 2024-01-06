/* eslint-disable consistent-return */
import { Observer, Subject } from "../../interface";

export class ConcreteSubject implements Subject {
  public state: number;

  public observers: Observer[] = [];

  public attach(observer: Observer): void {
    console.log(this.observers);
    const isExist = this.observers.includes(observer);

    if (isExist) {
      throw new Error("Subject: Observer has been attached already.");
    }

    console.log("Subject: Attached an observer.");
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      throw Error("Subject: non exist observer.");
    }

    this.observers.splice(observerIndex, 1);
    console.log("Subject: Detached an observer.");
  }

  public notify(message): void {
    this.observers.forEach((x) => x.update(message));
  }
}
