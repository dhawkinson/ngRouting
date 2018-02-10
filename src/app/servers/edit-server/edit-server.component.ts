import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-edit-server',
    templateUrl: './edit-server.component.html',
    styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
    server: {id: number, name: string, status: string};
    serverName = '';
    serverStatus = '';
    allowEdit = false;

    constructor(private serversService: ServersService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        //  snapshot does not allow for reation to changes - OK if you know params/fragment will not change within this component
        //console.log(this.route.snapshot.queryParams);
        //console.log(this.route.snapshot.fragment);
        
        //  the following are observables - provides abiity to react to changes in query params/fragment
        this.route.queryParams
        .subscribe(
            (queryParams: Params) => {
                this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
            }
        );
        this.route.fragment.subscribe();
        //  end of observables
        this.server = this.serversService.getServer(1);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
    }

    onUpdateServer() {
        this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    }

}
