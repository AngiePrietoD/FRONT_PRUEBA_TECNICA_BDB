import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { EditEventComponent } from './edit-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

describe('EditEventComponent', () => {
  let component: EditEventComponent;
  let fixture: ComponentFixture<EditEventComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<EditEventComponent>>;
  let mockEventService: jasmine.SpyObj<EventService>;
  let mockToastr: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockEventService = jasmine.createSpyObj('EventService', ['updateEvent', 'createEvent']);
    mockToastr = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [EditEventComponent],
      imports: [ReactiveFormsModule,MatIconModule,MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { id: 1, title: 'Evento 1', date: '2025-01-01', description: 'Desc', location: 'Lugar' } },
        { provide: EventService, useValue: mockEventService },
        { provide: ToastrService, useValue: mockToastr },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar el formulario con datos de entrada', () => {
    expect(component.eventForm.value.title).toEqual('Evento 1');
    expect(component.eventForm.value.date).toEqual('2025-01-01');
  });

  it('Debe actualizar un evento existente', () => {
    const mockEventResponse = { id: 1, title: 'Evento 1', date: '2025-01-01', description: 'Desc', location: 'Lugar' };
    mockEventService.updateEvent.and.returnValue(of(mockEventResponse));
    component.submitForm();
    expect(mockEventService.updateEvent).toHaveBeenCalled();
    expect(mockToastr.success).toHaveBeenCalledWith('Evento actualizado exitosamente', 'Éxito');
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('Debe manejar error al actualizar un evento', () => {
    mockEventService.updateEvent.and.returnValue(throwError(() => new Error('Error en servidor')));
    component.submitForm();
    expect(mockToastr.error).toHaveBeenCalledWith('Error al actualizar el evento', 'Error');
  });

  it('Debe crear un nuevo evento', () => {
    component.data = null;
    fixture.detectChanges();
    const mockEventResponse = { id: 1, title: 'Evento 1', date: '2025-01-01', description: 'Desc', location: 'Lugar' };
    mockEventService.createEvent.and.returnValue(of([mockEventResponse]));
    component.submitForm();
    expect(mockEventService.createEvent).toHaveBeenCalled();
    expect(mockToastr.success).toHaveBeenCalledWith('Evento creado exitosamente', 'Éxito');
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('Debe manejar error al crear un evento', () => {
    component.data = null;
    fixture.detectChanges();
    mockEventService.createEvent.and.returnValue(throwError(() => new Error('Error en servidor')));
    component.submitForm();
    expect(mockToastr.error).toHaveBeenCalledWith('Error al crear el evento', 'Error');
  });

  it('Debe cerrar el diálogo sin refrescar', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });
});
