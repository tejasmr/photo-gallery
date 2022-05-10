import { IonBadge, IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonImg, IonItemGroup, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import UserPhoto from "../hooks/UserPhoto";
import './PhotoViewer.css';
import { parseExtension, parseName, parseSize } from "../hooks/parser";
import { close, trash } from "ionicons/icons";
import usePhotoService from "../hooks/usePhotoService";

export const PhotoViewer: React.FC<RouteComponentProps<{filepath: string}>> = ({ match }) => {
    const filepath = match.params.filepath;
    const { getPhoto } = usePhotoService();
    const [photo, setPhoto] = useState<UserPhoto>({filepath: 'Undefined', webviewPath: '', size: 0});
    const getPhotoWrapper = async () => {
        const photo = await getPhoto(filepath);
        setPhoto(photo);
    };
    useEffect(() => {
        if(photo.webviewPath === '')
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
                        <IonButton color="danger">
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
