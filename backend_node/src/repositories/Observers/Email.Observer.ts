/* eslint-disable class-methods-use-this */
import { Observer, Subject } from "../../interface";
import { ConcreteSubject } from "./subject";

export class EmailObserver implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log("ConcreteObserverA: Reacted to the event.");
    }
  }
}
