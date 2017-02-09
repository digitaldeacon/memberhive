import {Component, OnInit, Input} from '@angular/core';
import {TitleService} from "../../common/title.service";
import {ActivatedRoute, Params} from "@angular/router";
import {MdDialog, MdDialogRef} from '@angular/material';
import {MemoService} from "../note.service";
import {Memo} from "../note.interface";

@Component({
    selector: 'mh-memo-list',
    templateUrl: 'note-list.component.html',
    styleUrls: ['note-list.component.scss']
})
export class NoteListComponent implements OnInit {
    @Input() memo: Memo;
    selectedOption: string;

    showTypeSelector: boolean = false;

    constructor(private titleService: TitleService,
                private route: ActivatedRoute,
                private memoService: MemoService,
                public dialog: MdDialog) {
    }

    ngOnInit(): void {
    }

    showTypes(): void {
        this.showTypeSelector = true;
    }
    openDialog() {
        let dialogRef = this.dialog.open(NoteDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
        });
    }
}

@Component({
    selector: 'note-dialog',
    templateUrl: 'note-dialog.html',
})
export class NoteDialogComponent {
    constructor(public dialogRef: MdDialogRef<NoteDialogComponent>) {}
}
