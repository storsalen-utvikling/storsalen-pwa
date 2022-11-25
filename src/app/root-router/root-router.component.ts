import { Component, OnInit } from '@angular/core';
import { routes } from '../app-routing.module';

@Component({
  selector: 'app-root-router',
  templateUrl: './root-router.component.html',
  styleUrls: ['./root-router.component.css'],
})
export class RootRouterComponent {
  links = routes.map(route => route.path);
  activeLink = this.links[0];

  constructor() {}
}
