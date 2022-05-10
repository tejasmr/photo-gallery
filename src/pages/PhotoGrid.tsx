import { IonCol, IonGrid, IonRow } from "@ionic/react";
import UserPhoto from "../hooks/UserPhoto";
import { PhotoCard } from "./PhotoCard";

interface PhotoGridProps {
    photos: UserPhoto[]
}

export default function PhotoGrid({photos}: PhotoGridProps) {
    return (
        <IonGrid>
            <IonRow>
            {photos.map((photo, index) => (
            <IonCol sizeLg='2' sizeMd='3' sizeSm='4' sizeXs='5'>
                <PhotoCard photo={photo}></PhotoCard>
            </IonCol>
            ))} 
            </IonRow>
        </IonGrid>
    )
}
