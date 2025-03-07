import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListEventComponent } from './list-event.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/app/services/event.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { EventRequest } from 'src/app/models/event.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


describe('ListEventComponent', () => {
  let component: ListEventComponent;
  let fixture: ComponentFixture<ListEventComponent>;
  let mockEventService: jasmine.SpyObj<EventService>;
  let mockToastr: jasmine.SpyObj<ToastrService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockEventService = jasmine.createSpyObj('EventService', ['consultAll', 'deleteEvent']);
    mockToastr = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ListEventComponent],
      imports: [ MatFormFieldModule, MatIconModule, MatTableModule, MatPaginatorModule, ],
      providers: [
        { provide: EventService, useValue: mockEventService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListEventComponent);
    component = fixture.componentInstance;
  });

  it('Debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe listar eventos correctamente', fakeAsync(() => {
    const mockEvents: EventRequest[] = [
      { id: 1, title: 'Evento 1', date: '2025-01-01', description: 'Desc 1', location: 'Ubicación 1' },
      { id: 2, title: 'Evento 2', date: '2025-02-01', description: 'Desc 2', location: 'Ubicación 2' }
    ];
    
    mockEventService.consultAll.and.returnValue(of(mockEvents));

    component.listEvent();
    tick();

    expect(component.dataSource.data).toEqual(mockEvents);
  }));

  it('Debe manejar error al listar eventos', fakeAsync(() => {
    mockEventService.consultAll.and.returnValue(throwError(() => new Error('Error en API')));

    component.listEvent();
    tick();

    expect(component.dataSource.data).toEqual([]);
  }));

/*   it('Debe eliminar un evento y mostrar mensaje de éxito', fakeAsync(() => {
    
    mockEventService.deleteEvent.and.returnValue(of('Evento eliminado'));

    component.deleteEvent(1);
    tick();

    expect(mockToastr.success).toHaveBeenCalledWith('Evento eliminado');
    expect(mockEventService.consultAll).toHaveBeenCalled(); 
  })); */

/*   it('Debe manejar error al eliminar un evento', fakeAsync(() => {
    mockEventService.deleteEvent.and.returnValue(throwError(() => new Error('Error al eliminar')));

    component.deleteEvent(1);
    tick();

    expect(mockToastr.success).not.toHaveBeenCalled();
  })); */

  it('Debe abrir el modal de edición', () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefMock.afterClosed.and.returnValue(of(true)); 

    mockDialog.open.and.returnValue(dialogRefMock);
    component.openEditModal({ id: 1, title: 'Evento', date: '2025-01-01', description: 'Desc', location: 'Ubicación' });

    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('Debe filtrar correctamente la tabla', () => {
    component.dataSource = new MatTableDataSource([
      { id: 1, title: 'Evento 1', date: '2025-01-01', description: 'Desc 1', location: 'Ubicación 1' },
      { id: 2, title: 'Evento 2', date: '2025-02-01', description: 'Desc 2', location: 'Ubicación 2' }
    ]);

    const event = { target: { value: 'evento 1' } } as unknown as Event;
    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('evento 1');
  });
});

