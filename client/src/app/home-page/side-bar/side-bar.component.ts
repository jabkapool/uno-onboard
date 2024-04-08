import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  @Output()
  newItemEvent = new EventEmitter<string>();

  showUsers(value: string) {
    this.newItemEvent.emit(value);
  }
}
