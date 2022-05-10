import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { camera } from "ionicons/icons";

interface PhotoCaptureProps {
    takePhoto: () => Promise<void>
}

export default function PhotoCapture({ takePhoto }: PhotoCaptureProps) {
    return (
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton 
          onClick={() => takePhoto()}
          >
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
    )
}
