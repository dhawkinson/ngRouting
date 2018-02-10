import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
    server: {id: number, name: string, status: string};

    constructor(private serversService: ServersService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];   //  + converts string to a number (id is a number)
        this.server = this.serversService.getServer(id);
        //  observable
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.server = this.serversService.getServer(+params['id']);   //  + converts string to a number
                }
            );
    }
    onEdit() {
        //  relative path from the current (server/:id) path queryParamsHandling: 'preserve', preserves queryParams
        this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    }
}
