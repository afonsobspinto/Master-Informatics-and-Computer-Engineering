import { Component, OnInit, Input } from '@angular/core';
import { VideoService } from 'app/services/video.service';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-button-gradient',
	templateUrl: './button-gradient.component.html',
	styleUrls: ['./button-gradient.component.css']
})
export class ButtonGradientComponent implements OnInit {

	@Input() title: string;
	@Input() index: number;
	@Input() active: boolean = false;
	@Input() padding: string = "px-3";
	@Input() link: string;
	@Input() func: Function = () => { };
	@Input() toggleEvent: Observable<number>;
	private toggleSub: any

	constructor() { }

	ngOnInit() {		
		if (this.toggleEvent)
			this.toggleSub = this.toggleEvent.subscribe((index) => this.toggleActive(index))
	}

	funcCall() {
		this.func()
	}

	toggleActive(index: number) {
		this.active = index === this.index;
	}

	ngOnDestroy() {
		if (this.toggleEvent)
			this.toggleSub.unsubscribe()
	}
}
