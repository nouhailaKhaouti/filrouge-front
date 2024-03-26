import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  navCollapsed: any;
  navCollapsedMob: boolean;
  windowWidth: number;

  // constructor(private location: Location) {
  //   let current_url = this.location.path();
  //   if (this.location['_baseHref']) {
  //     current_url = this.location['_baseHref'] + this.location.path();
  //   }

  //   this.windowWidth = window.innerWidth;
  //   this.navCollapsed =
  //     this.windowWidth >= 992 ? DattaConfig.isCollapseMenu : false;
  //   this.navCollapsedMob = false;
  // }

  navMobClick() {
    if (
      this.navCollapsedMob &&
      !document
        .querySelector('app-navigation.pcoded-navbar')
        .classList.contains('mob-open')
    ) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }
}
