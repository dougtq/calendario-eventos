import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  public logOut(): void {
    this.authService.logOut();
  }
}
