import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuditService } from "./audit.service";
import { ActionLog } from "./audit";

@Component({
    moduleId: 'mh-audit',
    selector: 'mh-audit-log',
    templateUrl: './audit-log.component.html',
    styleUrls: ['./audit-log.component.scss' ]
})
export class AuditLogComponent implements OnInit {

    private logs: Array<ActionLog>;

    constructor(private route: ActivatedRoute,
                private auditService: AuditService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.auditService.getLogPerson(params['id']))
            .subscribe((logs: Array<ActionLog>) => {
                this.logs = logs;
            });
    }

}
