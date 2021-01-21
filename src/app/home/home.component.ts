import { Component, OnInit } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { IPicPage, IPicture } from '../core/entities';
import { ImageService } from '../services/image.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public content: IPicPage;
	public selectedPicture: IPicture;
	public loadingPicture: boolean = false;

	constructor(private imageService: ImageService) { }

	ngOnInit() {
		this.imageService.getImages().subscribe(data => {
			this.content = data as IPicPage;
		})
	}

	public getImage(id: string): void {
		this.selectedPicture = null;
		this.loadingPicture = true;
		this.imageService.getImage(id).subscribe(data => {
			this.selectedPicture = data as IPicture;
			console.log(this.selectedPicture)
			this.loadingPicture = false;
		})
	}
}
