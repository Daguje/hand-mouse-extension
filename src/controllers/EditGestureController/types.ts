import { Camera } from "@lib/Camera";
import HandLandmarkEstimatorService from "@services/HandLandmarkEstimatorService";
import EditGestureView from "@views/EditGestureView";

export interface IEditGestureControllerProps {
  view: EditGestureView;
  camera: Camera;
  handLandmarkService: HandLandmarkEstimatorService;
  gesture: number
}

export enum CaptureStates {
  Stopped,
  Started,
  Running,
  Done,
  Processing,
  Saving
}