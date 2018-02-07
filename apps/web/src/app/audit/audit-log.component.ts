import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuditService } from './audit.service';
import { ActionLog } from './audit';
import { Person } from '@memberhivex/core';

@Component({
  moduleId: 'mh-audit',
  selector: 'mh-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent implements OnInit, OnChanges {
  logs: Array<ActionLog>;
  @Input() person: Person;

  constructor(private route: ActivatedRoute, private auditService: AuditService, private router: Router) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.auditService.getLogPerson(params['id']))
      .subscribe((logs: Array<ActionLog>) => {
        this.logs = logs;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['person']) {
      if (this.person) {
        this.auditService.getLogPerson(this.person.uid).subscribe((logs: Array<ActionLog>) => {
          this.logs = logs;
        });
      }
    }
  }

  getDiffDetails(diff: any): string {
    let diffObject: string[];
    if (diff) {
      diffObject = Object.keys(JSON.parse(diff));
      diffObject.splice(diffObject.indexOf('updated_at', 1));
    }
    return diffObject.toString();
  }
}
