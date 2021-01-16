
import {IPedido} from './schema';
import pedidos from './schema';

export default class PedidoService {
    
    public createPedido(pedido_params: IPedido, callback: any) {
        const _session = new pedidos(pedido_params);
        _session.save(callback);
    }

    public filterPedido(query: any, callback: any) {
        pedidos.findOne(query, callback);
    }

    public listPedidos(callback: any){
        pedidos.find(callback);
    }

    public updatePedido(pedido_params: IPedido, callback: any) {
        const query = { numero: pedido_params.numero };
        pedidos.findOneAndUpdate(query, pedido_params, callback);
    }
    
    public deletePedido(_id: String, callback: any) {
        const query = { numero: _id };
        pedidos.deleteOne(query, callback);
    }
}