import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-items-detail',
  templateUrl: './items-detail.component.html',
  styleUrls: ['./items-detail.component.scss']
})
export class ItemsDetailComponent implements OnInit {
  id: any;
  data: any;
  loading: boolean;
  constructor(public router: ActivatedRoute, private http: HttpClient, private messageService: MessageService) { }

  ngOnInit() {
    this.loading = true;
    this.detailProduct();
  }

  private detailProduct() {
    this.router.params.subscribe(p => {
      this.id = p['id'];
    });
    this.http.get(environment.apiURL + "items/" + this.id)
      .subscribe(
        values => this.httpSuccess(values),
        (err: Response) => this.httpError(err));
  }

  private httpSuccess(values) {
    this.data = values.item;
    this.loading = false;
  }

  private httpError(err) {
    this.messageService.add(`${err.error.message}`);
  }

}
