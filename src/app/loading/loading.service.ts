import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoadingService {

    private loadingSubject = new BehaviorSubject<boolean>(false);

    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    constructor() {
        console.log("Loading service created...");
    }

    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
        return of(null).pipe(
            tap(() => this.loadingOn()),
            // attende il completamento del parametro
            concatMap(() => obs$),
            finalize(() => this.loadingOff())
        )
            
    }

    loadingOn() {
        this.loadingSubject.next(true);
    }

    loadingOff()    {
        this.loadingSubject.next(false);
    }

}