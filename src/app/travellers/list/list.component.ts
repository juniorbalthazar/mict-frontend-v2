import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective} from 'ng-uikit-pro-standard';
import {TravellersService} from '../travellers.service';
import {Travellers} from '../../models/travellers';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(MdbTableDirective, {static: true}) mdbTable:
    MdbTableDirective;
  elements: any = [];
  travellers: any[];
  response: any;
  headElements = ['Code', 'Nom',
    'Prenom', 'Sexe', 'Date de naissance', 'Document de voyage', 'Numero d\'identification', 'Test PCR', 'Date du test'];
  searchText = '';
  previous: string;

  constructor(private travellerService: TravellersService) {
  }

  @HostListener('input') oninput() {
   // this.searchItems();
  }

  ngOnInit() {
    this.getTravellers();
  }

  // searchItems() {
  //   const
  //     prev = this.mdbTable.getDataSource();
  //   if (!this.searchText) {
  //     this.mdbTable.setDataSource(this.previous);
  //     this.elements =
  //       this.mdbTable.getDataSource();
  //   }
  //   if (this.searchText) {
  //     this.elements =
  //       this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['first',
  //         'last']);
  //     this.mdbTable.setDataSource(prev);
  //   }
  // }

  getTravellers(){
   this.travellerService.travellers(0, 15).subscribe( data => {
     this.response = data;
     this.travellers = this.response.data;
   });
  // console.log(this.travellers);
  }

}
