import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  createSensor(): void {
    this.router.navigate(['createsensor'], { relativeTo: this.route });
  }

}
