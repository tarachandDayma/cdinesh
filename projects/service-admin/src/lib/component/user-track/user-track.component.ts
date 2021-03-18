import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { alertserice, loaderserice } from 'service-common';
import { DiamondTrackModel } from '../../models/diamond.track.model';
import { TrackTypeModel } from '../../models/tracktype.model';
import { DiamondTrackService } from '../../service/diamond.track.service';
import { TrackTypeService } from '../../service/track.type.service';

@Component({
  selector: 'lib-user-track',
  templateUrl: './user-track.component.html',
  styleUrls: ['./user-track.component.css']
})
export class UserTrackComponent implements OnInit {

  TrackTypes: TrackTypeModel[] = [];
  constructor(private diamondTrackService: DiamondTrackService, private trackTypeServic: TrackTypeService, private loader: loaderserice, private alertService: alertserice
    , public translate: TranslateService
    , private modalService: NgbModal
    , private router: Router) { }

  ngOnInit(): void {
    this.LoadTrack();
  }
  LoadTrack() {
    this.loader.show(true);
    this.trackTypeServic.LoadAllByUser().subscribe(result => {
      this.loader.show(false);
      this.TrackTypes = result;
    }, error => {
      this.loader.show(false);
    })
  }
  Remove(item: TrackTypeModel) {
    var trackList: DiamondTrackModel[] = [];
    item.diamondTracks.forEach(element1 => {
      if (element1.isActive) {
        trackList.push(element1);
      }
    });
    this.loader.show(true);
    this.diamondTrackService.Remove(trackList).subscribe(result => {
      this.loader.show(false);
      this.LoadTrack();
    }, error => this.loader.show(false));

  }
  Update(item: TrackTypeModel) {
    var trackList: DiamondTrackModel[] = [];
    item.diamondTracks.forEach(element1 => {
      if (!element1.isActive) {
        trackList.push(element1);
      }
    });
    this.loader.show(true);
    this.diamondTrackService.Active(trackList).subscribe(result => {
      this.loader.show(false);
      this.LoadTrack();
    }, error => this.loader.show(false));

  }
  Search(item: TrackTypeModel) {
    var packetNo: string = "";

    item.diamondTracks.forEach(element1 => {
      if (element1.isActive) {
        if (packetNo == "") {
          packetNo = element1.packetNo;
        } else {
          packetNo = packetNo + "," + element1.packetNo;
        }
      }
    });
    localStorage.setItem("PacketNo", packetNo)
    if (-1 !== this.router.url.indexOf("SearchPacket")) {
      location.reload();
    } else {
      this.router.navigateByUrl("/admin/SearchPacket");
    }

  }
  toggleDate(item) {
    item.changeDate = !item.changeDate;
  }
}
