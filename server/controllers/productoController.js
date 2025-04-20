import productoModel from '../models/productoModel.js';
class productoController {
  constructor() {}

  async create(req, res) {
    try {
      const data = await productoModel.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).send(error);

    }
  }
  async update(req, res) {
    try {
      const {id} = req.params;
      const data = await productoModel.update(id, req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);

    }
  }
  async delete(req, res) {
    try {
      const {id} = req.params;
      const data = await productoModel.delete(id);
        res.status(206).json(data);
    } catch (error) {
        res.status(500).send(error);

    }
  }
  async getAll(req, res) {
    try {
      const data = await productoModel.getAll();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).send(error);

    }
  }
  async getOne(req, res) {
    try {
      const {id} = req.params;
      const data = await productoModel.getOne(id);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).send(error  );

    }
  }
}
export default new productoController();
