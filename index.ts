console.clear();
import { fromEvent, zip, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

const eventTime = eventName =>
  fromEvent(document, eventName).pipe(map(() => new Date()));

const mouseClickDuration =
  zip(
    eventTime('mousedown'),
    eventTime('mouseup')
  ).pipe(
    map(([start, end]) =>
      Math.abs((start.getTime() - end.getTime())))
  );

const isMouseClickLongerThan = milliseconds =>
  mouseClickDuration.pipe(
    tap(v => console.log(`click was ${v} milliseconds long`)),
    switchMap(duration => of(duration > milliseconds))
  );

isMouseClickLongerThan(1000)
  .subscribe(v => 
    console.log(`which is ${v ? "" : "NOT"} 
    longer than 1000 milliseconds`));