import { Component, OnInit } from '@angular/core';
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

	public disablePrevButton: boolean = true;
	public disableNextButton: boolean = false;

	public disablePrevPicButton: boolean = false;
	public disableNextPicButton: boolean = false;

	private MIN_PIC_ARRAY: number = 0;
	private MAX_PIC_ARRAY: number = 9;

	constructor(private imageService: ImageService) { }

	ngOnInit() {
		this.imageService.getImages().subscribe(data => {
			this.content = data as IPicPage;
		})
	}

	public getImage(id: string, index: number): void {
		this.selectedPicture = null;
	
		this.disablePrevPicButton = index === this.MIN_PIC_ARRAY;
		this.disableNextPicButton = index === this.MAX_PIC_ARRAY;		

		this.imageService.getImage(id).subscribe(data => {
			this.selectedPicture = data as IPicture;
			this.selectedPicture.tagList = this.splitTags(data.tags);
			this.selectedPicture.index = index;
		})
	}

	public changeImage(index: number): void {
		this.getImage(this.content.pictures[index].id, index);
	}

	public changePage(pageNumber: number): void {
		this.content.pictures = null;
		this.imageService.getImages(pageNumber).subscribe(data => {
			this.content = data as IPicPage;

			this.disablePrevButton = this.content.page === 1;
			this.disableNextButton = this.content.page ===  this.content.pageCount;
		})
	}

	private splitTags(tags: string): string[] {
		// Remove the empty space that always comes at the end
		tags = tags.trimEnd();
		// Split the string into chunks
		return tags.split(' ');
	}
}
 