import {Component, OnInit, Inject, ViewContainerRef, ViewChild} from '@angular/core';
import {VoiceControlService} from "./voice-control.service";
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'sa-commands-help',
  templateUrl: './commands-help.component.html',
  styles: [],
})
export class CommandsHelpComponent implements OnInit {

  @ViewChild('seeCommandsModal') public seeCommandsModal: ModalDirective;

  constructor() {}

  ngOnInit() {
  }

  public show(){
    this.seeCommandsModal.show()
  }

  public hide(){
    this.seeCommandsModal.hide()
  }
}
