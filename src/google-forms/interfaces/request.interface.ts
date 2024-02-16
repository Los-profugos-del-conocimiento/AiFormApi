import { Info, FormSettings, Item } from '.';

export interface Request {
    updateFormInfo?: UpdateFormInfo;
    updateSettings?: UpdateSettings;
    createItem?: CreateItem;
    moveItem?: MoveItem;
    deleteItem?: DeleteItem;
    updateItem?: UpdateItem;
}

interface UpdateFormInfo {
    info: Info;
    updateMask: string;
}

interface UpdateSettings {
    settings: FormSettings;
    updateMask: string;
}

interface CreateItem {
    item: Item;
    location: Location;
}

interface MoveItem {
    originalLocation: Location;
    newLocation: Location;
}

interface DeleteItem {
    location: Location;
}

interface UpdateItem {
    item: Item;
    location: Location;
    updateMask: string;
}

interface Location {
    index?: number;
}
