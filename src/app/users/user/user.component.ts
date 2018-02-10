import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
    user: {id: number, name: string};
    paramsSubscription: Subscription;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        //  takes a snapshot of params OnInit - doesn't allow for recognition of changes
        this.user = {
            id: this.route.snapshot.params['id'],
            name:  this.route.snapshot.params['name']
        };
        //  this is a Subscription using an observable (params) -- allows you to recognize changes to params
        this.paramsSubscription = this.route.params
            .subscribe(
                (params: Params) => {
                    this.user.id = params['id'];
                    this.user.name = params['name'];
                }
            );
    }

    //  removes the subscription - in this case not needed because Angular does it automatically on rxjs observables
    //      this is just for pratice, (Angular won't remove the subscription on custom observables)
    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

}
