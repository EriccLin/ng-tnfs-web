import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-case-create',
  templateUrl: './case-create.component.html',
  styleUrls: ['./case-create.component.css']
})
export class CaseCreateComponent implements OnInit{
  time: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
  seconds = true;

  toggleSeconds() {
    this.seconds = !this.seconds;
  }
  model!: NgbDateStruct;
  mranks = [
    { id: 1, name: "警員", selected: true },
    { id: 2, name: "巡佐" },
    { id: 3, name: "偵查佐" },
    { id: 4, name: "小隊長" },
    { id: 5, name: "巡官" },
    { id: 6, name: "分隊長" },
    { id: 7, name: "警務員" },
    { id: 8, name: "副隊長" },
    { id: 9, name: "警務正" },
    { id: 10, name: "隊長" },
    { id: 11, name: "副分局長" },
    { id: 12, name: "分局長" },
  ];
  constructor() { 
  }
  ngOnInit(): void {
    $(function(){
      $("#timePicker").hide();
      $("#timePickerBtn").on("click",function(){
        console.log(this);
        $("#timePicker").toggle();
      });
    });

  }
}
