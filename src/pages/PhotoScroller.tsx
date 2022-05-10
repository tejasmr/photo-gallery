import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";

interface PhotoScrollerProps {
    loadData: (ev: any) => void,
    isInfiniteDisabled: boolean
}

export default function PhotoScroller({ loadData, isInfiniteDisabled }: PhotoScrollerProps) {
    return (
        <IonInfiniteScroll
            onIonInfinite={loadData}
            threshold="100px"
            disabled={isInfiniteDisabled}>
            <IonInfiniteScrollContent
                loadingSpinner="bubbles"
                loadingText="Loading more data..."/>
        </IonInfiniteScroll>
    );
}
