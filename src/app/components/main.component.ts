import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {CameraService} from '../camera.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	imagePath = '/assets/cactus.png'
	articleForm
	userName
	password

	constructor(private cameraSvc: CameraService, private _route: ActivatedRoute, private _http: HttpClient) {
		this._route.queryParams.subscribe(params => {
			this.userName = params['userName'];
			this.password = params['password'];
		});
	}

	ngOnInit(): void {
	this.articleForm = new FormGroup({
		title: new FormControl('', [Validators.required]),
		comments: new FormControl('', [Validators.required])
	})
	  if (this.cameraSvc.hasImage()) {
		  const img = this.cameraSvc.getImage()
		  this.imagePath = img.imageAsDataUrl
	  }
	}

	clear() {
		this.imagePath = '/assets/cactus.png'
	}



	SERVER_URL = "http://localhost:3000/api/upload";
	AWS_URL = 'https://bkt.sfo2.digitaloceanspaces.com/'

	async onShare() {
		const img = this.cameraSvc.getImage();
		const title = this.articleForm.get('title').value;
		const comments = this.articleForm.get('comments').value;
		const userName = this.userName;
		const password = this.password;

		const formData = new FormData();

		formData.append('title', title);
		formData.append('comments', comments);
		formData.append('userName', userName);
		formData.append('password', password);
		formData.append('img', img.imageData, img.imageAsDataUrl);

		await this._http.post<any>(this.SERVER_URL, formData)
			.toPromise()
			.then( result => { //result <- {"id": "5fdc4fb0d0427b3cfcd045d2"}
				if ( !!result.id === false) {
					throw { result } 
				}
				this.imagePath = `${this.AWS_URL}${result.id}`;
				this.articleForm.get('title').setValue("");
				this.articleForm.get('comments').setValue("");
				
				
			}).catch( (error) => {
				console.error(error)
			});
		
		//if
		//if http operation is successful, clear view 2 //200
		//clear title
		//clear comments
		//display placeholder image
		//

		//else //401 got to login page

		//elsen console.log error message
	}
}
