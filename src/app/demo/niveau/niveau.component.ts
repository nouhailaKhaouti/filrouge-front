import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-niveau',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './niveau.component.html',
  styleUrl: './niveau.component.scss'
})
export class NiveauComponent {
  constructor(private router: Router) { }

  SubscriptionPage(prefix: string): void {
    this.router.navigate(['/subscription', prefix]);
  }
}
