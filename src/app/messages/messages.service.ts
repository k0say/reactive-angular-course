import { filter } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class MessagesServices   {

    private subject = new BehaviorSubject<string[]>([]);
    
    errors$: Observable<string[]> = this.subject.asObservable().pipe(
        filter(messages => messages && messages.length > 0)
    );
    
    showErrors(...errors: string[])    {
        this.subject.next(errors);
    }

}