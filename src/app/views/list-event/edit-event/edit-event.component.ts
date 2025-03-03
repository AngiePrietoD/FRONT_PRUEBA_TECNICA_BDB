import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EventModel, EventFormModel } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {
  constructor(
    public dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public eventService: EventService,
    private toastr: ToastrService,
  ) { }

  event: EventModel[] = [];
  
  eventForm = new FormGroup<EventFormModel>({
    title: new FormControl({ value: this.data?.title|| '', disabled: false }, Validators.required),
    date: new FormControl({ value: this.data?.date|| '', disabled: false }, Validators.required),
    description: new FormControl({ value: this.data?.description|| '', disabled: false }, Validators.required),
    location: new FormControl({ value: this.data?.location|| '', disabled: false }, Validators.required),
  });


  submitForm() {
    const formData = this.eventForm.value;

    if (this.data && this.data.id) {
      this.eventService.updateEvent({ id: this.data.id, ...formData }).subscribe(
        () => {
          this.toastr.success('Evento actualizado exitosamente', 'Éxito');
          this.close(true);
        },
        error => {
          console.error('Error al actualizar el evento:', error);
          this.toastr.error('Error al actualizar el evento', 'Error');
        }
      );
    } else {
      this.eventService.createEvent(formData).subscribe(
        () => {
          this.toastr.success('Evento creado exitosamente', 'Éxito');
          this.close(true);
        },
        error => {
          console.error('Error al crear el evento:', error);
          this.toastr.error('Error al crear el evento', 'Error');
        }
      );
    }
  }

  close(refresh: boolean = false): void {
    this.dialogRef.close(refresh); 
  }

}
