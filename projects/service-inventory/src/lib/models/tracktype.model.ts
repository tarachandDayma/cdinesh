import { DiamondTrackModel } from "./diamond.track.model";

export class TrackTypeModel {
    id: number;
    trackType: string;
    isActive: boolean;
    diamondTracks: DiamondTrackModel[] = [];
}