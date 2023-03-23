import connectDB from '../../../utils/connectDB'
import Orders from '../../../models/orderModel'

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      try {
        const fromDate = new Date(req.body.fromDate);
        const toDate = new Date(req.body.toDate);
        const dateOfPayment = { $gte: fromDate, $lte: toDate };
        const orders = await Orders.find({ dateOfPayment: dateOfPayment });
        return res.json(orders);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
      }
  }
}
