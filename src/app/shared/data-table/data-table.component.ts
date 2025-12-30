import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from 'src/app/resolvers/event-list-resolver';
import { AppEvent } from 'src/app/services/event.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T> {

  @Input() rows: T[] = [];
  @Input() columns: TableColumn<T>[] = [];

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<number>();

  remove(id: number) {
    this.delete.emit(id)
  }

  editRow(row: any) {
    this.edit.emit(row)
  }

  getValue(row: any, key: any) {
    return row[key];
  }

  getId(row: any): number {
    return row.id;
  }
}
