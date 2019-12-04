import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  OpenAboutModal(){
    document.getElementById("AboutInfo").style.display="block";
  }

  OpenHowToModal(){
    document.getElementById("HowToInfo").style.display="block";
  }

  CloseSideBar($event)
  {
    document.getElementById("sDataDetails").style.display="none";
  }
}
