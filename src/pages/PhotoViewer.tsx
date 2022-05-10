import { IonBadge, IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonImg, IonItemGroup, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import UserPhoto from "../hooks/UserPhoto";
import './PhotoViewer.css';
import { parseExtension, parseName, parseSize } from "../hooks/parser";
import { close, trash } from "ionicons/icons";
import { PhotoServiceProps } from "../hooks/usePhotoService";

interface PhotoViewerProps extends RouteComponentProps<{filepath: string}>{
    photoService: PhotoServiceProps
}

export const PhotoViewer: React.FC<PhotoViewerProps> = ({ match, photoService }) => {
    const [photo, setPhoto] = useState<UserPhoto>({filepath: 'Undefined', webviewPath: '', size: 0});
    const { filepath } = match.params;
    const { getPhoto, deletePhoto } = photoService.photoService;
    const getPhotoWrapper = async () => {
        const photo = await getPhoto(filepath);
        console.log(filepath);
        setPhoto(photo);
    };
    useEffect(() => {
        getPhotoWrapper();
    });
    return (
        <IonPage>
            <IonContent text-center>
                <IonCard id="photoCard">
                    <IonImg id="photo" src={photo?.webviewPath} />
                    <IonCardHeader>
                        <IonCardTitle>{parseName(photo.filepath)}</IonCardTitle>
                    </IonCardHeader>
                    <IonItemGroup id="badgeGroup">
                        <IonBadge color="danger">{parseSize(photo.size)}</IonBadge>
                        <IonBadge color="success">{parseExtension(photo.filepath)}</IonBadge>
                    </IonItemGroup>
                    <IonItemGroup id="actionButtonGroup">
                        <IonButton onClick={() => deletePhoto(photo.filepath)} routerLink="/photos" color="danger">
                            <IonIcon icon={trash} />
                        </IonButton>
                        <IonButton routerLink="/photos" color="warning">
                            <IonIcon icon={close} />
                        </IonButton>
                    </IonItemGroup>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}