import { FormControl } from "@angular/forms";

export interface EventModel {
    title: string;
    date: string;
    description: string;
    location: string,
}

export interface EventRequest {
    id:number
    title: string;
    date: string;
    description: string;
    location: string,
}

export interface EventFormModel {
    title: FormControl<string | null>;
    date: FormControl<string | null>;
    description: FormControl<string | null>;
    location: FormControl<string | null>;
  }