
import {IItem} from './schema';
import itens from './schema';

export default class ItemService {
    
    public createItem(item_params: IItem, callback: any) {
        const _session = new itens(item_params);
        _session.save(callback);
    }

    public filterItem(query: any, callback: any) {
        itens.findOne(query, callback);
    }

    public updateItem(item_params: IItem, callback: any) {
        const query = { _id: item_params._id };
        itens.findOneAndUpdate(query, item_params, callback);
    }
    
    public deleteItem(_id: String, callback: any) {
        const query = { _id: _id };
        itens.deleteOne(query, callback);
    }
}