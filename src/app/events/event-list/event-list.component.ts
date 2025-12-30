import { Component, OnInit } from '@angular/core';
import { EventService, AppEvent } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: AppEvent[] = [];
  sidebarOpen = false;
  selectedEvent: AppEvent | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(e => this.events = e);
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => this.loadEvents());
  }

  openSidebar() {
    this.selectedEvent = null;
    this.sidebarOpen = true;
  }

  editEvent(event: AppEvent) {
    this.selectedEvent = event;
    this.sidebarOpen = true;
  }

  onEventSaved() {
    this.sidebarOpen = false;
    this.selectedEvent = null;
    this.loadEvents();
  }
}
