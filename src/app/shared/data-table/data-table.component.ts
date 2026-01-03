import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from 'src/app/models/table-column.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T> {

  @Input() rows: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() isHelpdesk = false;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<number>();
  @Output() openChat = new EventEmitter<T>();
  @Output() closeChat = new EventEmitter<T>();

  hasStatus(row: any): row is { status: string } {
    return 'status' in row;
  }

  remove(id: number) {
    this.delete.emit(id)
  }

  editRow(row: any) {
    this.edit.emit(row)
  }

  onOpenChat(row: T) {
    this.openChat.emit(row);
  }

  onCloseChat(row: T) {
    this.closeChat.emit(row);
  }

  getValue(row: any, key: any) {
    return row[key];
  }

  getId(row: any): number {
    return row.id;
  }
}
