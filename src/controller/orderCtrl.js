import Order from "../model/Order";

const orderCtrl = {
    getAllOrder: async(req, res) => {
        try {
            const orders = await Order.find()
                .populate('orderer')
                .populate('dishes')


            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getOrdersByClient: async(req, res) => {
        try {
            const orders = await Order.find({ orderer: req.params.c_id })
                .populate('orderer')
                .populate('dishes')
                .sort({createdAt: -1});


            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json(error);
        }

    },
    getOderByStatus: async(req, res) => {
        try {
            const order = await Order.find({ status: req.params.status })
                .populate('orderer')
                .populate('dishes')
                .sort({ createdAt: -1 });

            // console.log(req.params.status)
            console.log(order);
            if (!order) {
                return res.status(404).json("con cai nit!");
            }

            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getOrder: async(req, res) => {
        try {
            const order = await Order.findById(req.params.id)
                .populate('orderer')
                .populate('dishes');

            if (!order) {
                return res.status(404).json("Don dat hang khong ton tai!");
            }

            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    createOrder: async(req, res) => {
        try {
            const order = await new Order(req.body);
            console.log(req.body.timeDelivery);
            order.timeDelivery = new Date(req.body.timeDelivery);
            console.log(order);
            await order.save();
            const newOrder = await Order.findById(order._id).populate('orderer').populate('dishes');

            return res.status(200).json(newOrder);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    updateOrder: async(req, res) => {
        try {
            const order = await Order.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true }
            ).populate('orderer').populate('dishes');

            if (!order) {
                return res.status(404).json("Don dat hang khong ton tai!")
            }

            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    deleteOrder: async(req, res) => {
        try {
            const order = await Order.findByIdAndDelete(req.params.id);

            if (!order) {
                return res.status(404).json("Don dat hang khong ton tai!")
            }

            return res.status(200).json("Xoa don hang thanh cong!");
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default orderCtrl;