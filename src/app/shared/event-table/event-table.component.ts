import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppEvent } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent {
  @Input() events: AppEvent[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<AppEvent>();
}
