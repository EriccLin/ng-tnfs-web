import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

// declare var jQuery: any;
// declare var $: jquery;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  name: string = '林嘉源';
  rank: string = '巡官';
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    // let mainBtns = document.querySelectorAll(".main");
    // console.log(mainBtns);
    // mainBtns.forEach((val, ind) => {

    //   val.addEventListener('click', (e) => {
    //     console.log(e.target as HTMLElement);
    //     let mainParent = (e.target as HTMLElement).parentElement;

    //     // console.log(mainParent);
    //     // mainParent?.classList.toggle("show");
    //   });
    // });
    $(function () {
      $("ul.subs").hide();
      $("div.main").on("click", function (this: any) {
        var chk = $("+ul", this).css("display");
        // console.log("check: ", chk);
        // $("ul.subs").hide();
        if (chk === "none") {
          $("+ul", this).css({ "display": "block" });
        } else {
          $("+ul", this).hide();
        }
      });
    });
  }
  onLogout() {
    console.log('logout');
    this.authService.logout();
  }
}
