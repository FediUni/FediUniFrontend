import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  
  constructor() { }
}

interface Note {
  name: String
  content: String
}