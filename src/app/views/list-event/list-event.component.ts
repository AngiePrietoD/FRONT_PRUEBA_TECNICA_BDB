import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventModel, EventRequest } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})

export class ListEventComponent {

  event: EventRequest[] = [];

  constructor(private toastr: ToastrService, public dialog: MatDialog, public eventService: EventService) {}
  displayedColumns = ['title', 'date', 'description', 'location','actions'];
  dataSource = new MatTableDataSource<EventRequest>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.listEvent();
  }

  showSuccess(message:string) {
    this.toastr.success(message);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditModal(element: any | null = null): void {
    const dialogRef = this.dialog.open(EditEventComponent, {
      width: '600px',  
      data: element    
    });

    dialogRef.afterClosed().subscribe((refresh: boolean) => {
      if (refresh) {
        this.listEvent();
      }
    });
  }

  listEvent() {
    this.eventService.consultAll().subscribe({
      next: (data) => {
        if (data) {
          this.dataSource.data = data;
          console.log('Lista de eventos:', data);
        }
      },
      error: (error) => {
        console.error('Error al obtener la lista de eventos:', error);
      }
    });
  }

  deleteEvent(id:any){
    this.eventService.deleteEvent(id).subscribe({
      next: (data) => {
        if (data) {
          this.showSuccess(data);
          this.listEvent();
        }
      },
      error: (error) => {
        console.error('Error al obtener la lista de eventos:', error);
      }
    });
  }
  
}

