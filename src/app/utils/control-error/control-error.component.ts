import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ControlMessageService } from '../../services/control-message.service';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss']
})
export class ControlErrorComponent implements OnInit {

  constructor() { }
  @Input() control: FormControl;

  event: FormControl;
  ngOnInit(): void {
  }

  get errorMessage() {


    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ControlMessageService.getValidatorErrorMessage(this.getName(this.control), propertyName, this.control.errors[propertyName]);
      }
      if (this.control.valueChanges) {
        return ControlMessageService.showValidatorErrorMessage(propertyName, this.control.errors[propertyName])
      }
    }

    return null;
  }

	/**
	 * This method used to find the control name
	 * @param control - AbstractControl
	 */
  private getName(control: AbstractControl): string | null {
    let group = <FormGroup>control.parent;

    if (!group) {
      return null;
    }

    let name: string;

    Object.keys(group.controls).forEach(key => {
      let childControl = group.get(key);

      if (childControl !== control) {
        return;
      }
      name = key;
    });

    return name;
  }

}
