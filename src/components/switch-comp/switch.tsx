import { Component, h, State, Event, EventEmitter } from "@stencil/core";
import 'bootstrap-switch';
import 'jquery';
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css';
import $ from 'jquery';
import '../../jquery-extensions';
import { v4 as uuidv4 } from 'uuid';

@Component({
    tag: 'jji-switch-comp',
    styleUrl: './switch.css',
})
export class SwitchComp {

    @State() checkBox: boolean = false;
    @Event({ bubbles: true, composed: true }) checkBoxCall: EventEmitter<boolean>;
    uuId: string = uuidv4();


    handleCheckboxChange(event: Event) {
        const checkbox = event.target as HTMLInputElement;
        this.checkBox = checkbox.checked;
        this.checkBoxCall.emit(this.checkBox);
        console.log(this.checkBox);
    }



    componentDidLoad() {

        const testElement = $(`#${this.uuId}`);
        if (testElement.length) {

            // Initialize Bootstrap switch
            testElement.bootstrapSwitch();
            
            // Listen for Bootstrap switch change event
            testElement.on('switchChange.bootstrapSwitch', (event, state) => {
                console.log(this.checkBox);
                console.log(event);
                this.checkBox = state;
                this.checkBoxCall.emit(this.checkBox);
            });
        }
    }


    render() {
        let mainContent = null;

        mainContent = (
            
                <div class="float-left">
                    <input
                        type="checkbox"
                        class="make-switch switchBootstrap"
                        id={this.uuId}
                        onClick={this.handleCheckboxChange.bind(this)}
                    />
                </div>
            
        )
        return (
            mainContent
        )
    }
}