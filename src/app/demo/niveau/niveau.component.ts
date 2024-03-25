import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-niveau',
  standalone: true,
  imports: [],
  templateUrl: './niveau.component.html',
  styleUrl: './niveau.component.scss'
})
export class NiveauComponent {
  constructor(private router: Router) { }

  SubscriptionPage(prefix: string): void {
    this.router.navigate(['/subscription', prefix]);
  }
}
