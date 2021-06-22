import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Arrangement } from 'src/app/models/arrangement/arrangement';
import { DayRoutine } from 'src/app/models/day_routine/day-routine';
import { ArrangementService } from 'src/app/services/arrangement/arrangement.service';
import { DayRoutineService } from 'src/app/services/day_routine/day-routine.service';

@Component({
  selector: 'app-day-routine',
  templateUrl: './day-routine.component.html',
  styleUrls: ['./day-routine.component.css']
})
export class DayRoutineComponent implements OnInit {
  public arrangements : Array<Arrangement>;
  public dayRoutines : Array<DayRoutine>;
  constructor(private arrangementService : ArrangementService,
    private toastr : ToastrService,
    private router : Router, private dayRoutineService : DayRoutineService) { 
}

  ngOnInit(): void {
    this.getDayRoutines();
  }

  //------------------------------------------------------------//

  public getDayRoutines() : void {
    this.dayRoutines =  new Array<DayRoutine>();
    this.dayRoutineService.getDayRoutines().subscribe(
      result => {
        result.forEach(element => {
          let vDayRoutine : DayRoutine = new DayRoutine();

          Object.assign(vDayRoutine, element);

          this.dayRoutines.push(vDayRoutine);
        });
      },

      error => {
        this.toastr.error("ERROR","ERROR");
      }
    );
  }

  //------------------------------------------------------------//

  public deleteDayRoutine(id : string) : void {
    this.dayRoutineService.deleteDayRoutine(id).subscribe(
      result => {
        if(result.status == "1"){
          this.toastr.success("Success.","Routine deleted.");
          this.getDayRoutines();
        }
        else {
          this.toastr.error("Error", "Routine not deleted.");
        }
      },

      error => {
        this.toastr.error("ERROR", "ERROR");
      }
    );
  }
  //------------------------------------------------------------//

  public addNewDayRoutine() : void {
    this.router.navigate(["dayRoutine/form", "new"]);
  }
 
  //------------------------------------------------------------//

  public editDayRoutine(id : string) : void {
    this.router.navigate(["dayRoutine/form", id]);
  }

}