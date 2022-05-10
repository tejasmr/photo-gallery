import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { PhotoServiceProps } from '../hooks/usePhotoService';

import PhotoCapture from './PhotoCapture';

import PhotoGrid from './PhotoGrid';
import PhotoScroller from './PhotoScroller';


const PhotoGallery: React.FC<PhotoServiceProps> = (photoService: PhotoServiceProps) => {
  const { photos, takePhoto } = photoService.photoService;
  const [ isInfiniteDisabled, setInfiniteDisabled ] = useState(false);

  const loadData = (ev: any) => {
    setTimeout(() => {
      console.log('Loaded data');
      ev.target.complete();
      if (photos.length === 1000) {
        setInfiniteDisabled(true);
      }
    }, 500);
  }  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <PhotoGrid photos={photos} />
        <PhotoScroller loadData={loadData} isInfiniteDisabled={isInfiniteDisabled} />
        <PhotoCapture takePhoto={takePhoto} />
      </IonContent>
    </IonPage>
  );
};

export default PhotoGallery;
