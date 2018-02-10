import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [
        { path: ':id/:name', component: UserComponent }
    ] },
    { path: 'servers', component: ServersComponent, children: [
        { path: ':id', component: ServerComponent },
        { path: ':id/edit', component: EditServerComponent }
    ] },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' }                    //  wildcard route, must be last is chain of routes

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes) //  configure the module for export
    ],
    exports: [RouterModule]             //  export the configured module
})

export class AppRoutingModule {

}
