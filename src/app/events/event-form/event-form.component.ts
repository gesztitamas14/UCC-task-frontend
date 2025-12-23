import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Router } from '@angular/router';
import { AppEvent, EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventformComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  title = '';
  occurrence_datetime = '';
  description = '';

  constructor(private eventService: EventService) {}

  save() {
    this.eventService.createEvent({
      title: this.title,
      occurrence_datetime: this.occurrence_datetime,
      description: this.description
    }).subscribe(() => this.saved.emit());
  }
}

