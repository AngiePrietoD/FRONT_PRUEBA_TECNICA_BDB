import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEventComponent } from './edit-event.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';

describe('EditEventComponent', () => {
  let component: EditEventComponent;
  let fixture: ComponentFixture<EditEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventComponent ],
      imports: [
        HttpClientTestingModule, 
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        EventService,
        { provide: MatDialogRef, useValue: {} }, 
        { provide: MAT_DIALOG_DATA, useValue: {} } 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
