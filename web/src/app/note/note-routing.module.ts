import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteComponent } from './note.component';
import { NoteListComponent } from './list/note-list.component';
import { NoteCreateComponent } from './create/note-create.component';

const routes: Routes = [
    {
        path: '',
        component: NoteComponent,
        children: [
            {path: '', component: NoteListComponent},
            {path: 'list', component: NoteListComponent},
            {path: 'create', component: NoteCreateComponent}
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NoteRoutingModule {
}
