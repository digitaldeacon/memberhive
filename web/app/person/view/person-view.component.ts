import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../common/title.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {MdDialog, MdDialogRef} from '@angular/material';
import {PersonService} from "../person.service";
import {Person} from "../person";
import {PersonRelationsDialogComponent} from "../dialogs/person-relations.dialog";

@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-view',
    templateUrl: './person-view.component.html',
    styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit {
    private persons: Array<Person>;
    person: Person;
    dialogRef: MdDialogRef<PersonRelationsDialogComponent>;
    lastCloseResult: string;

    constructor(private titleService: TitleService,
                private router: Router,
                private route: ActivatedRoute,
                private personService: PersonService,
                public dialog: MdDialog) {
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.personService.getPerson(params['id']))
            .subscribe((person: Person) => {
                this.person = person;
                this.titleService.setTitle('Person: ' + person.fullName);
        });
    }

    prevPerson(): void {
        this.personService.getPersons() // TODO: get them from the cache
            .subscribe(
                (persons: Array<Person>) => {
                    this.persons = persons;
                    let idx: number = this.persons.findIndex((p: Person) => p.uid === this.person.uid);
                    idx--;
                    if (this.persons[idx]) {
                        this.router.navigate(['/person/view', this.persons[idx].uid]);
                    }
                });
    }
    nextPerson(): void {
        this.personService.getPersons() // TODO: get them from the cache
            .subscribe(
                (persons: Array<Person>) => {
                    this.persons = persons;
                    let idx: number = this.persons.findIndex((p: Person) => p.uid === this.person.uid);
                    idx++;
                    if (this.persons[idx]) {
                        this.router.navigate(['/person/view', this.persons[idx].uid]);
                    }
                });
    }
    openDlgRelationships(): void {
        this.dialogRef = this.dialog.open(PersonRelationsDialogComponent);

        this.dialogRef.afterClosed().subscribe((result: string) => {
            this.lastCloseResult = result;
            this.dialogRef = undefined;
        });
    }
}
