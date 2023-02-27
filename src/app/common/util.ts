import { Observable, Observer } from "rxjs";
import { Course } from "../model/course";

export function createHttpObservable(url: string){
  return new Observable((SomeName: Observer<Course>) => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(url, {signal}).then(
      (response) => {
        if(response.ok){
          return response.json()
        }else{
          SomeName.error(`Request Failed With The Status Code: ${response.status}`)
        }
      }
    ).then(
      (response) => {
        SomeName.next(response);
        SomeName.complete();
      }
    ).catch(
      (error) => {
        SomeName.error(error)
      }
    )
    return () => controller.abort();
  });
}

