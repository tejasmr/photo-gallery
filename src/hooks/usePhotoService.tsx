import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { Directory, Filesystem, ReadFileResult, StatResult } from "@capacitor/filesystem";
import { base64FromPath } from "./base64FromPath";
import { PHOTO_STORAGE } from "./paths";
import UserPhoto from "./UserPhoto";
import { Storage } from "@capacitor/storage";
import { useEffect, useState } from "react";

export default function usePhotoService(): PhotoServiceReturn {
    const [photos, setPhotos] = useState<UserPhoto[]>([]);
    const readPhoto = async (filepath: string): Promise<ReadFileResult> => {
        return await Filesystem.readFile({
            path: filepath,
            directory: Directory.Data,
        });
    }
    const getPhoto = async (filepath: string): Promise<UserPhoto> => {
        const photo = await readPhoto(filepath);
        const stats = await getPhotoStats(filepath);
        return {
            filepath: filepath,
            webviewPath: `data:image/jpeg;base64,${photo.data}`,
            size: stats.size
        };
    }
    const writePhoto = async (photo: Photo, filename: string) => {
        const base64Data = await base64FromPath(photo.webPath!);
        await Filesystem.writeFile({
            path: filename,
            data: base64Data,
            directory: Directory.Data,
        });
    }
    const getPhotoStats = async (filename: string): Promise<StatResult> => {
        return await Filesystem.stat({
            path: filename, 
            directory: Directory.Data
        });
    }
    const savePhoto = async (photo: Photo, filename: string): Promise<UserPhoto> => {
        await writePhoto(photo, filename);
        const stats = await getPhotoStats(filename)
        return { filepath: filename, webviewPath: photo.webPath, size: stats.size };
    };
    const deletePhoto = async (filepath: string) => {
        const newPhotos = photos.filter((p: UserPhoto) => p.filepath !== filepath);
        Storage.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
        const filename = filepath.substr(filepath.lastIndexOf('/') + 1);
        await Filesystem.deleteFile({
            path: filename,
            directory: Directory.Data,
        });
        setPhotos(newPhotos);
    };
    const capturePhoto = async () => {
        return Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
    }
    const takePhoto = async () => {
        const photo = await capturePhoto();
        const fileName = "PIC" + new Date().getTime() + '.jpeg';
        const savedFileImage = await savePhoto(photo, fileName);
        const newPhotos = [savedFileImage, ...photos];
        setPhotos(newPhotos);
        Storage.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
    };
    useEffect(() => {
        const loadSaved = async () => {
            const { value } = await Storage.get({ key: PHOTO_STORAGE });
            const photosInStorage = (value ? JSON.parse(value) : []) as UserPhoto[];

            for (let photo of photosInStorage) {
                const file = await readPhoto(photo.filepath);
                photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
            }
            setPhotos(photosInStorage);
        };
        loadSaved();
    }, []);

    return {
        photos,
        readPhoto,
        getPhoto,
        writePhoto,
        savePhoto,
        deletePhoto,
        capturePhoto,
        takePhoto,
        getPhotoStats,
    };
}

interface PhotoServiceReturn {
    photos: UserPhoto[],
    readPhoto: (filepath: string) => Promise<ReadFileResult>,
    getPhoto: (filepath: string) => Promise<UserPhoto>,
    writePhoto: (photo: Photo, filename: string) => Promise<void>,
    savePhoto: (photo: Photo, filename: string) => Promise<UserPhoto>,
    deletePhoto: (filepath: string) => Promise<void>,
    capturePhoto: () => Promise<Photo>,
    takePhoto: () => Promise<void>,
    getPhotoStats: (filename: string) => Promise<StatResult>,
}

export interface PhotoServiceProps {
    photoService: PhotoServiceReturn;
}