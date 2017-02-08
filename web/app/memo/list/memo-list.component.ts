import {Component, OnInit, Input} from '@angular/core';
import {TitleService} from "../../common/title.service";
import {ActivatedRoute, Params} from "@angular/router";
import {MdDialog, MdDialogRef} from '@angular/material';
import {MemoService} from "../memo.service";
import {Memo} from "../memo.interface";

@Component({
    selector: 'mh-memo-list',
    templateUrl: 'memo-list.component.html',
    styleUrls: ['memo-list.component.scss']
})
export class MemoListComponent implements OnInit {
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
        let dialogRef = this.dialog.open(MemoDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
        });
    }
}

@Component({
    selector: 'memo-dialog',
    templateUrl: './memo-dialog.html',
})
export class MemoDialogComponent {
    constructor(public dialogRef: MdDialogRef<MemoDialogComponent>) {}
}
