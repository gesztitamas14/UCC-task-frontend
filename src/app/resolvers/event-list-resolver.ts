import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { AppEvent, EventService } from "../services/event.service";
import { firstValueFrom } from "rxjs";

export interface TableColumn<T = any> {
    key: keyof T | string;
    header: string;
    formatter?: (value: any, row: T) => string;
    class?: string;
}

@Injectable({ providedIn: 'root' })
export class EventListResolver implements Resolve<{
    events: AppEvent[];
    columns: TableColumn<AppEvent>[];
}> {
    constructor(private eventService: EventService) { }

    async resolve() {
        const events = await firstValueFrom(this.eventService.getEvents());

        const columns: TableColumn<AppEvent>[] = [
            { key: 'title', header: 'Title' },
            {
                key: 'occurrence_datetime',
                header: 'Date',
                formatter: v => new Date(v).toLocaleString()
            },
            {
                key: 'description',
                header: 'Description',
                class: 'text-muted'
            }
        ];

        return { events, columns };
    }
}
