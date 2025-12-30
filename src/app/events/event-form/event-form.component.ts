import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { AppEvent, EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventformComponent implements OnChanges {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();
  @Input() event: AppEvent | null = null;
  editMode:boolean = false

  form = this.fb.group({
    title: [''],
    occurrence_datetime: [''],
    description: ['']
  });

  constructor(private eventService: EventService, private fb: FormBuilder) {}

  ngOnChanges() {
    if (this.event) {
      this.editMode = true;
      const date = this.event.occurrence_datetime;

      let formattedDate = '';
      if (date) {
        const d = new Date(date);
        const offset = d.getTimezoneOffset();
        const localDate = new Date(d.getTime() - offset * 60 * 1000);
        formattedDate = localDate.toISOString().slice(0,16);
      }

      this.form.patchValue({
        title: this.event.title,
        occurrence_datetime: formattedDate,
        description: this.event.description
      });
    } else {
      this.editMode = false;
      this.form.reset();
    }
  }

  save() {
    if (this.event) {
      const description = this.form.get('description')?.value ?? '';
      this.eventService.updateEvent(this.event.id!, description)
        .subscribe(() => this.saved.emit());
    } else {
      this.eventService.createEvent(this.form.value as any)
        .subscribe(() => {
          this.editMode = false;
          this.saved.emit()}
        );
        
    }
  }

}

