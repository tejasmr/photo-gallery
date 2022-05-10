import { IonBadge, IonCard, IonImg, IonItem } from "@ionic/react";
import { parseSize } from "../hooks/parser";
import UserPhoto from "../hooks/UserPhoto";
import './PhotoCard.css'

interface PhotoCardProps {
    photo: UserPhoto
}

export function PhotoCard({ photo }: PhotoCardProps) {
    return (
        <IonItem routerLink={"/photos/details/"+photo.filepath}>
            <IonCard id="card">
                <IonImg src={photo.webviewPath} />
                <IonBadge id="badge" color="primary">{parseSize(photo.size)}</IonBadge>
            </IonCard>
        </IonItem>
    );
}
